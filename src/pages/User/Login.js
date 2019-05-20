import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
// import Link from 'umi/link';
import { Alert, Form, Input, Icon, Button } from 'antd';
import styles from './Login.less';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class LoginPage extends Component {
  state = {
    error: null,
    // autoLogin: true,
  };

  OnSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'login/login',
          payload: { username: values.username, password: values.password },
        });
      }
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator } = form;
    // const { type, autoLogin } = this.state;
    const { error } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.OnSubmit} className="login-form">
          <div style={{ marginTop: 20 }}>
            {error &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
          </div>
          <Button
            size="large"
            type="primary"
            loading={submitting}
            htmlType="submit"
            // onClick={this.OnSubmit}
            style={{ width: '100%', marginTop: '10px' }}
          >
            登入
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
