import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidMount(prevProps) {
        const { error, isAuthenticated } = this.props;
        console.log(prevProps)
        // if (error !== prevProps.error) {
        //check for register error
        if (error.id === 'REGISTER_FAIL') {
            this.setState({
                msg: error.msg.msg
            });
        }
        else {
            this.setState({ msg: null })
        }
        // }

        // if authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser);

        this.toggle();
    }

    render() {
        return (
            <div>
                <NavLink
                    onClick={this.toggle} href="#"
                >Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ?
                            <Alert color="danger"
                            >{this.state.msg}</Alert>
                            : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name"
                                    className="mb-3"
                                    id="item" placeholder="Name..."
                                    onChange={this.onChange} />
                                <Label for="email">Email</Label>
                                <Input type="email" name="email"
                                    className="mb-3"
                                    id="email" placeholder="Email..."
                                    onChange={this.onChange} />
                                <Label for="password">Password</Label>
                                <Input type="password" name="password"
                                    className="mb-3"
                                    id="password" placeholder="Password..."
                                    onChange={this.onChange} />



                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {
    register, clearErrors
})(RegisterModal);