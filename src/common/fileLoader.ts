import {EventEmitter} from 'events';

class FileLoader extends EventEmitter {

    private readonly loader! : HTMLInputElement;

    constructor( filter : string = 'image/*' ) {

        super();
        this.loader = document.createElement('input');
        this.loader.type = 'file';
        this.loader.accept = filter;
        this.loader.multiple = true;
        this.loader.addEventListener('change', this.onChangeInput.bind(this));
    }

    addFile() {
        const customEvent = new MouseEvent('click', { bubbles : true });
        this.loader.dispatchEvent( customEvent );
    }

    private onChangeInput( event : Event ) {
        const { files } : any = event.target as HTMLInputElement;


        for ( let i = 0; i < files.length; i++ ) {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = (e) => {
                if (reader.readyState === FileReader.DONE) {
                    this.onFileLoad( e, file );
                }
            };

        }
    }

    private onFileLoad( event : any, file : File ) {
        const dataString = event.target.result; //data string;
        this.emit( 'onLoadFile', dataString, file );
    }
}

function mbToByte( mb = 1 ) {
    return mb * 1024 * 1024;
}

function kbToByte( kb = 1 ) {
    return kb * 1024;
}

export {
    FileLoader,
    mbToByte,
    kbToByte,
}