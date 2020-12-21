import React from "react";
import packageJson from '../package.json';
global.appVersion = packageJson.version;

//  1st param is from meta.json, second param is the local version
const semverGreaterThan = (versionA, versionB) => {
    const vA = versionA.split(/\./g);

    const vB = versionB.split(/\./g);
    while (vA.length || vB.length) {
        const a = Number(vA.shift());

        const b = Number(vB.shift());
        // eslint-disable-next-line no-continue
        if (a === b) continue;
        // eslint-disable-next-line no-restricted-globals
        return a > b || isNaN(b);
    }
    return false;
};

class CacheBuster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            refreshCacheAndReload: () => {
                console.log('Clearing cache and reloading...')
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    caches.keys().then(function (names) {
                        for (let name of names) caches.delete(name);
                    });
                }

                // delete browser cache and hard reload
                window.location.reload();
            }
        };
    }

    componentDidMount() {
        fetch('/meta.json')
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version;
                const currentVersion = global.appVersion;

                const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
                if (shouldForceRefresh) {
                    console.log(`We have a new version - ${latestVersion}. Should force refresh`);
                    this.setState({ loading: false, isLatestVersion: false });
                } else {
                    console.log(`You are on the latest version -${latestVersion}. No cache refresh needed.`);
                    this.setState({ loading: false, isLatestVersion: true });
                }
            });
    }
    render() {
        const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
        return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
    }
}

export default CacheBuster;