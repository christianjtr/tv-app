import React from 'react';

const Loading: React.FC = (): React.ReactElement => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );
};

export default Loading;
