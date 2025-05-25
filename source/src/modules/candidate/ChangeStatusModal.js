import { BaseForm } from '@components/common/form/BaseForm';
import SelectField from '@components/common/form/SelectField';
import { candidateStatusOptions } from '@constants/masterData';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { Card, Col, Empty, Form, Modal, Row } from 'antd';
import React, { useEffect } from 'react';

const ChangeStatusModal = ({ open, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false); // <-- thêm state loading
    const translate = useTranslate();
    const statusOptions = translate.formatKeys(candidateStatusOptions, 'label');

    useEffect(() => {
        if (open) {
            form.setFieldsValue(initialValues || {});
        }
    }, [open, initialValues]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await onOk(values);
        } catch (e) {
            console.error('Validation failed:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            centered
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText={translate.formatMessage(commonMessage.confirm)}
            cancelText={translate.formatMessage(commonMessage.cancel)}
            title={translate.formatMessage(commonMessage.changeStatus)}
        >
            <BaseForm form={form} size="100%">
                <Card className="card-form" bordered={false}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <SelectField
                                label={translate.formatMessage(commonMessage.status)}
                                required
                                requiredMsg={translate.formatMessage(commonMessage.required)}
                                name="status"
                                notFoundContent={<Empty description={translate.formatMessage(commonMessage.noData)} />}
                                options={statusOptions}
                            />
                        </Col>
                    </Row>
                </Card>
            </BaseForm>
        </Modal>
    );
};

export default ChangeStatusModal;
