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
import { login } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'
// import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';


class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
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

        const { email, password } = this.state;

        const user = {
            email, password
        }

        //attempt log in
        this.props.login(user)
        //close toggle
        // this.toggle();
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.modal}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.handleOnSubmit}>
                            <FormGroup>

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
                                    Login
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
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);