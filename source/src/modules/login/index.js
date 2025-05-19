import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Form } from 'antd';

import apiConfig from '@constants/apiConfig';
import { setCacheAccessToken } from '@services/userService';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import InputTextField from '@components/common/form/InputTextField';
import styles from './index.module.scss';
import { accountActions } from '@store/actions';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import Title from 'antd/es/typography/Title';
import { showErrorMessage } from '@services/notifyService';
import { appAccount, brandName,ADMIN_LOGIN_TYPE, storageKeys, appType } from '@constants';
import { commonMessage } from '@locales/intl';
import { Buffer } from 'buffer';
import useTranslate from '@hooks/useTranslate';
import { setData } from '@utils/localStorage';

window.Buffer = window.Buffer || Buffer;
const message = defineMessages({
    username: 'Username',
    password: 'Password',
    login: 'Login',
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Sai tên đăng nhập hoặc mật khẩu !!!',
    notFound : 'Không tìm thấy tài khoản này trong app',
    verifyFailOTP: 'Mã OTP không đúng!!!',
    systemError: 'Lỗi hệ thống!',
    fail: 'Có lỗi xảy ra khi đăng nhập',
    verifySuccessOTP: 'Xác thực OTP thành công!!!',
    loginNoAccess: 'Loại tài khoản không phù hợp!!!',
    otp: 'OTP',
    cancel: 'Hủy',
});


const LoginPage = () => {
    const intl = useIntl();
    const translate = useTranslate();
    const [isMfaSSO, setIsMfaSSO] = useState(null);
    const [urlSSO, setUrlSSO] = useState(null);
    const [inforUser, setInforUser] = useState({});

    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');
    const { execute, loading } = useFetch({
        ...apiConfig.account.loginBasic,
        authorization: `Basic ${base64Credentials}`,
    });
    const { execute: executeSSO, loading: loadingSSO } = useFetch({
        ...apiConfig.account.loginSSO,
    });

    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const onFinish = (values) => {
        executeSSO({
            data: { ...values, app: appType },
            onCompleted: (res) => {
                if (res.data.isMfaEnable == false) {
                    execute({
                        data: { ...values, app: appType },
                        onCompleted: (res) => {
                            handleLoginSuccess(res);
                        },
                        onError: (err) => {
                            if (err?.response?.data?.message == 'Not found accountApp') {
                                showErrorMessage(translate.formatMessage(message.notFound));
                            } else {
                                showErrorMessage(translate.formatMessage(message.loginFail));
                            }
                        },
                    });
                } else {
                    setIsMfaSSO(res.data.isMfa);
                    if (res.data.qrUrl) {
                        setUrlSSO(res.data.qrUrl);
                    }
                    setInforUser(values);
                }
            },
            onError: () => showErrorMessage(translate.formatMessage(message.loginFail)),
        });
    };

    const handleLoginSuccess = (res) => {
        setCacheAccessToken(res.access_token);
        setData(storageKeys.USER_KIND, res.user_kind);
        executeGetProfile({ kind: res.user_kind });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <Title level={3}>{intl.formatMessage(commonMessage.login).toUpperCase()}</Title>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    layout="vertical"
                >
                    <InputTextField
                        name="username"
                        fieldProps={{ prefix: <UserOutlined /> }}
                        // label={intl.formatMessage(message.username)}
                        placeholder={intl.formatMessage(commonMessage.username)}
                        size="large"
                        required
                    />
                    <InputTextField
                        name="password"
                        fieldProps={{ prefix: <LockOutlined /> }}
                        // label={intl.formatMessage(message.password)}
                        placeholder={intl.formatMessage(commonMessage.password)}
                        size="large"
                        required
                        type="password"
                    />

                    <Button type="primary" size="large" loading={loading} htmlType="submit" style={{ width: '100%' }}>
                        {intl.formatMessage(commonMessage.login)}
                    </Button>
                    <center className="s-mt4px">
                        <small>
                            {intl.formatMessage(message.copyRight, { brandName, year: new Date().getFullYear() })}
                        </small>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
