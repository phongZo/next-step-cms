import { commonMessage } from '@locales/intl';
import { notification } from 'antd';

const showSucsessMessage = (content, translate) => {
    notification.success({
        message: translate?.formatMessage(commonMessage.success) || 'Thành công',
        description: content,
    });
};

const showErrorMessage = (content, translate) => {
    notification.error({
        message: translate?.formatMessage(commonMessage.error) || 'Lỗi',
        description: content,
    });
};

const showWarningMessage = (content, translate) => {
    notification.warning({
        message: translate?.formatMessage(commonMessage.warning) || 'Cảnh báo',
        description: content,
    });
};

export { showErrorMessage, showWarningMessage, showSucsessMessage };
