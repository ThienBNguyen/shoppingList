import React, { Component } from 'react'
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
import PropTypes from 'prop-types'
import { register } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'
// import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';


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
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        //if authenticated closed modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle()
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangeName = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        //create user object
        const newUser = {
            name,
            email,
            password
        }
        //attemp to register
        this.props.register(newUser);
        //close toggle
        // this.toggle();
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.modal}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.handleOnSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="name"
                                    onChange={this.handleChangeName}
                                />
                                <Label for="email">email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="  email"
                                    onChange={this.handleChangeName}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"

                                    placeholder="  password"
                                    onChange={this.handleChangeName}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);