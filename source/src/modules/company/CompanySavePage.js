import PageWrapper from '@components/common/layout/PageWrapper';
import { categoryKind } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import React, { useEffect } from 'react';
import routes from './routes';
import useTranslate from '@hooks/useTranslate';
import CompanyForm from '@modules/company/CompanyForm';
import { commonMessage } from '@locales/intl';

const CompanySavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { detail, mixinFuncs, loading, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.company.getById,
            create: apiConfig.company.create,
            update: apiConfig.company.update,
        },
        options: {
            getListUrl: routes.companyListPage.path,
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: detail.id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kind: categoryKind.news,
                };
            };
        },
    });

    const {
        data: categories,
        loading: getCategoriesLoading,
        execute: executeGetCategories,
    } = useFetch(apiConfig.category.autocomplete, {
        immediate: false,
        mappingData: ({ data }) => data.data.map((item) => ({ value: item.id, label: item.categoryName })),
    });

    useEffect(() => {
        executeGetCategories({
            params: {
                kind: categoryKind.news,
            },
        });
    }, []);

    return (
        <PageWrapper
            loading={loading || getCategoriesLoading}
            title={title}
            routes={pageOptions.renderBreadcrumbs(commonMessage, translate, title)}
        >
            <CompanyForm
                categories={categories}
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={mixinFuncs.onSave}
            />
        </PageWrapper>
    );
};

export default CompanySavePage;
