import React from 'react';
import ForgotPasswordModal from '../../ForgotPasswordModal';
import ResendEmailVerificationLink from '../../ResendEmailVerificationLink';

const Options = () => {
    return (
        <div className="mt-4">
            <ForgotPasswordModal />
            <ResendEmailVerificationLink />
        </div>
    );
};

export default Options;
