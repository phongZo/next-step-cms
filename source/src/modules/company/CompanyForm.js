import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useTranslate from '@hooks/useTranslate';
import RichTextField from '@components/common/form/RichTextField';
import { FormattedMessage } from 'react-intl';
import { BaseForm } from '@components/common/form/BaseForm';
import { commonMessage } from '@locales/intl';
const CompanyForm = ({ formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing }) => {
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null);
    const translate = useTranslate();

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError, setImageUrl) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                    setIsChangedFormValues(true);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({
            ...values,
            logo: avatarUrl,
            banner: bannerUrl,
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            categoryId: dataDetail?.category?.id,
        });

        setAvatarUrl(dataDetail.avatar);
        setBannerUrl(dataDetail.banner);
    }, [dataDetail]);

    return (
        <BaseForm id={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className="card-form" bordered={false}>
                <Row gutter={10}>
                    <Col span={12}>
                        <CropImageField
                            label={translate.formatMessage(commonMessage.logo)}
                            name="image"
                            imageUrl={avatarUrl && `${AppConstants.contentRootUrl}${avatarUrl}`}
                            aspect={1 / 1}
                            uploadFile={(...args) => uploadFile(...args, setAvatarUrl)}
                            required
                            requiredMsg={translate.formatMessage(commonMessage.required)}
                        />
                    </Col>
                    <Col span={12}>
                        <CropImageField
                            label={translate.formatMessage(commonMessage.banner)}
                            name="banner"
                            imageUrl={bannerUrl && `${AppConstants.contentRootUrl}${bannerUrl}`}
                            aspect={16 / 9}
                            uploadFile={(...args) => uploadFile(...args, setBannerUrl)}
                            required
                            requiredMsg={translate.formatMessage(commonMessage.required)}
                        />
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextField
                            required
                            label={translate.formatMessage(commonMessage.companyName)}
                            name="name"
                            requiredMsg={translate.formatMessage(commonMessage.required)}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            required
                            label={translate.formatMessage(commonMessage.hotline)}
                            name="hotline"
                            requiredMsg={translate.formatMessage(commonMessage.required)}
                        />
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={24}>
                        <TextField
                            required
                            label={translate.formatMessage(commonMessage.shortDescription)}
                            name="shortDescription"
                            requiredMsg={translate.formatMessage(commonMessage.required)}
                            type="textarea"
                        />
                    </Col>
                </Row>
                <RichTextField
                    label={translate.formatMessage(commonMessage.description)}
                    name="description"
                    required
                    requiredMsg={translate.formatMessage(commonMessage.required)}
                    style={{ height: 500, marginBottom: 40 }}
                />

                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default CompanyForm;
