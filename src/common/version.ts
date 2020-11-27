import * as _ from 'lodash';

class Version {

    major : number = 0;
    minor : number = 0;
    patch : number = 0;

    static validity( ver : string ) {
        if( ver as String) {
            const split = ver.split('.');
            if( split.length === 3 ) {
                const mj = Number(split[0]);
                const mn = Number(split[1]);
                const p = Number(split[2]);
                return _.isNumber(mj) && _.isNumber(mn) && _.isNumber(p);
            }
        }
        return false;

    }

    constructor( ver : string ) {

        if( ver ) {
            const split = ver.split('.');

            if( split.length >= 3 ) {
                this.major = Number(split[0]);
                this.minor = Number(split[1]);
                this.patch = Number(split[2]);
            }
        }
    }

    isNew( other : Version ) {
        return this.major > other.major ? true :
            this.major < other.major ? false :
                this.minor > other.minor ? true :
                    this.minor < other.minor ? false :
                        this.patch > other.patch ? true :
                            this.patch < other.patch ? false : false;
    }

    isOld( other : Version ) {
        return this.major < other.major ? true :
            this.major > other.major ? false :
                this.minor < other.minor ? true :
                    this.minor > other.minor ? false :
                        this.patch < other.patch ? true :
                            this.patch > other.patch ? false : false;
    }

    toString() : string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}

export default Version;