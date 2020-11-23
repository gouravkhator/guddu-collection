import React from 'react';

export default class OfflineMessage extends React.Component {
    state = {
        isDisconnected: false
    }

    componentDidMount() {
        this.handleConnectionChange();
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            this.setState({ isDisconnected: false });
        }
        if (condition === 'offline')
            this.setState({ isDisconnected: true });
    }

    render() {
        const { isDisconnected } = this.state;

        return (
            <>
                { isDisconnected && (
                    <div className="internet-lost-message">
                        <b>Offline!!</b>
                    </div>
                )}
            </>
        );
    }
}
