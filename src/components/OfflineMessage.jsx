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
            const webPing = setInterval(
                () => {
                    fetch('https://www.google.com', {
                        mode: 'no-cors',
                    }).then(() => {
                        this.setState({ isDisconnected: false }, () => {
                            return clearInterval(webPing)
                        });
                    }).catch(() => this.setState({ isDisconnected: true }))
                }, 2000);
            return;
        }

        return this.setState({ isDisconnected: true });
    }

    render() {
        const { isDisconnected } = this.state;

        return (
            <>
                { isDisconnected && (
                    <b>Offline!!</b>
                )}
            </>
        );
    }
}
