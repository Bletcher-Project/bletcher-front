import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import NavBar from 'Components/Main/NavBar';
import Input from 'Components/Common/Input';
import Button from 'Components/Common/Button';
import BackgroundSlider from 'react-background-slider';
import cx from 'classnames';
import 'animate.css';

import bgImage1 from 'Assets/bg-image/bg-1.jpg';
import bgImage2 from 'Assets/bg-image/bg-2.jpg';
import bgImage3 from 'Assets/bg-image/bg-3.jpg';

const defaultProps = {};
const propTypes = {};

const mapStateToProps = (state) => {
  return {
    // isLogin: ""
  };
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScreenIntro: true,
      isIdValid: true,
      isPwValid: true,
      idErrMsg: '',
      pwErrMsg: '',
      id: '',
      password: '',
    };
  }

  componentDidMount() {
    const { isSignIn } = this.props;
    this.setState({ isScreenIntro: !isSignIn });
  }

  render() {
    const { isScreenIntro, id, password } = this.state;
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
        <BackgroundSlider
          images={[bgImage1, bgImage2, bgImage3]}
          duration={10}
          transition={2}
        />

        <div className="mainPage__screen">
          <div
            className={cx('mainPage__screen__intro', {
              'animated slideOutUp': !isScreenIntro,
            })}
          >
            <div className="mainPage__screen__intro__part">
              <h1 className="mainPage__screen__intro__part-logo">Bletcher</h1>
              <p className="mainPage__screen__intro__part-text">
                Sketch and Create your own art.
              </p>
              <div className="mainPage__screen__intro__part-btn">
                <Button text="Getting Start" onClick={this.handleStart} />
              </div>
            </div>
          </div>

          <div
            className={cx({
              'mainPage__screen__signIn-none': isScreenIntro,
              'mainPage__screen__signIn animated slideInUp': !isScreenIntro,
            })}
          >
            <div className="mainPage__screen__signIn__part">
              <div
                className={cx('mainPage__screen__signIn__part__container', {
                  'mainPage__screen__signIn__part__container-on':
                    id !== '' || password !== '',
                })}
              >
                <div className="mainPage__screen__signIn__part__email">
                  <Input
                    className="mainPage__screen__signIn__part__email__input"
                    label="Email / Name"
                    type="text"
                    width={250}
                    onChange={(e) =>
                      this.setState({
                        id: e.target.value,
                        isIdValid: true,
                        idErrMsg: '',
                      })
                    }
                    onKeyPress={this.handleEnter}
                    error={!this.state.isIdValid}
                    helperText={this.state.idErrMsg}
                  />
                </div>
                <div className="mainPage__screen__signIn__part__password">
                  <Input
                    className="mainPage__screen__signIn__part__password__input"
                    label="Password"
                    type="password"
                    name="password"
                    width={250}
                    onChange={(e) =>
                      this.setState({
                        password: e.target.value,
                        isPwValid: true,
                        pwErrMsg: '',
                      })
                    }
                    onKeyPress={this.handleEnter}
                    error={!this.state.isPwValid}
                    helperText={this.state.pwErrMsg}
                  />
                </div>
                <div className="mainPage__screen__signIn__part-btn">
                  <Button text="Sign In" onClick={this.handleSignIn} />
                </div>
                <div className="mainPage__screen__signIn__part__signUpLink">
                  <a href="/signup">Don’t have an account?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleStart = () => {
    this.setState({ isScreenIntro: false });
  };

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSignIn();
    }
  };

  handleSignIn = () => {
    const { id, password } = this.state;
    if (id === '' && password === '') {
      this.setState({
        isIdValid: false,
        idErrMsg: 'Fill this field.',
        isPwValid: false,
        pwErrMsg: 'Fill this field.',
      });
    } else if (id === '') {
      this.setState({ isIdValid: false, idErrMsg: 'Fill this field.' });
    } else if (password === '') {
      this.setState({ isPwValid: false, pwErrMsg: 'Fill this field.' });
    } else {
      const params = { id: id, password: password };
      this.props
        .dispatch(AuthAction.postSignIn(params))
        .then(async (result) => {
          if (result === 'Login failed! Check authentication credentials') {
            this.setState({
              isIdValid: false,
              idErrMsg: 'Please check your account again.',
              isPwValid: false,
              pwErrMsg: 'Please check your account again.',
            });
          } else {
            await this.props.dispatch(AuthAction.getUser(result));
          }
        });
    }
  };
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps)(MainPage);
