import {
    EDIT_TYPE,
    PARAM_KEY_TYPE,
    ParamType,
} from '@/views/identity/user/modules/notification/notification-channel-item/type';
import { ComponentRenderProxy, getCurrentInstance, reactive } from '@vue/composition-api';
import { SpaceConnector } from '@/lib/space-connector';
import { showErrorMessage, showSuccessMessage } from '@/lib/util';
import { i18n } from '@/translations';

interface NotificationItemState {
	isEditMode: boolean;
	dataForEdit?: any;
	userChannelId?: string;
	projectChannelId?: string;
}
export const useNotificationItem = (obj: NotificationItemState) => {
    const vm = getCurrentInstance() as ComponentRenderProxy;
    const state = reactive<NotificationItemState>(obj);
    const cancelEdit = () => {
        state.isEditMode = false;
    };

    const startEdit = () => {
        state.isEditMode = true;
    };

    const updateUserChannel = async (paramKey, paramValue) => {
        try {
            const param: ParamType = {
                user_channel_id: state.userChannelId,
            };
            if (paramKey === PARAM_KEY_TYPE.NAME) param.name = paramValue;
            else if (paramKey === PARAM_KEY_TYPE.DATA) param.data = paramValue;
            await SpaceConnector.client.notification.userChannel.update(param);
            showSuccessMessage(i18n.t('IDENTITY.USER.NOTIFICATION.FORM.ALT_S_UPDATE_USER_CHANNEL'), '', vm.$root);
            state.isEditMode = false;
        } catch (e) {
            console.error(e);
            showErrorMessage(i18n.t('IDENTITY.USER.NOTIFICATION.FORM.ALT_E_UPDATE_USER_CHANNEL'), e, vm.$root);
        }
    };

    const updateProjectChannel = async (paramKey, paramValue) => {
        try {
            const param: ParamType = {
                // eslint-disable-next-line camelcase
                project_channel_id: state.projectChannelId,
            };
            if (paramKey === PARAM_KEY_TYPE.NAME) param.name = paramValue;
            else if (paramKey === PARAM_KEY_TYPE.DATA) param.data = paramValue;
            // eslint-disable-next-line camelcase
            else if (paramKey === PARAM_KEY_TYPE.LEVEL) param.notification_level = paramValue;
            await SpaceConnector.client.notification.projectChannel.update(param);
            showSuccessMessage(i18n.t('IDENTITY.USER.NOTIFICATION.FORM.ALT_S_UPDATE_PROJECT_CHANNEL'), '', vm.$root);
            state.isEditMode = false;
        } catch (e) {
            console.error(e);
            showErrorMessage(i18n.t('IDENTITY.USER.NOTIFICATION.FORM.ALT_E_UPDATE_PROJECT_CHANNEL'), e, vm.$root);
        }
    };


    return {
        state,
        cancelEdit,
        startEdit,
        updateUserChannel,
        updateProjectChannel,
    };
};