import Toast from 'react-native-toast-message';

export const showToast = {
    success: (message: string) => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: message,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 50,
        });
    },
    error: (message: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 50,
        });
    }
}; 