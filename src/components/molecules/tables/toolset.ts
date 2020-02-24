import { reactive } from '@vue/composition-api';


const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
export const tableProps = {
    tableStyleType: {
        type: String,
        default: null,
        validator(value) {
            return [null, ...color].indexOf(value) !== -1;
        },
    },
    theadStyleType: {
        type: String,
        default: null,
        validator(value) {
            return [null, 'light', 'dark'].indexOf(value) !== -1;
        },
    },
    responsiveStyle: {
        type: Object,
        default: null,
    },
    tableStyle: {
        type: Object,
        default: null,
    },
    theadStyle: {
        type: Object,
        default: null,
    },
    tbodyStyle: {
        type: Object,
        default: null,
    },
    tfootStyle: {
        type: Object,
        default: null,
    },
    tbodyClass: {
        type: Object,
        default: null,
    },
    tfootClass: {
        type: Object,
        default: null,
    },
    striped: {
        type: Boolean,
        default: true,
    },
    bord: {
        type: Boolean,
        default: null,
    },
    hover: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
    background: {
        type: Boolean,
        default: false,
    },
    responsive: {
        type: [String, Boolean],
        default: false,
        validator(value) {
            return [false, true, 'sm', 'md', 'lg', 'xl'].indexOf(value) !== -1;
        },
    },
};


export interface TablePropsType {
    striped?:boolean;
    bord?:boolean|null|unknown;
    hover?:boolean;
    small?:boolean;
    background?: boolean;
    responsive?: boolean|string;
    tableStyleType?:string;
    theadStyleType?: string;
    responsiveStyle?:object;
    tableStyle?:object;
    theadStyle?:object;
    tbodyStyle?:object;
    tfootStyle?: object;
    tbodyClass?: object;
    tfootClass?: object;
}

export class TableState {
    public state:TablePropsType;

    static initTableState:TablePropsType ={
        striped: true,
        bord: null,
        hover: true,
        small: false,
        background: false,
        responsive: false,
    };

    constructor(public initData:object = {}) {
        this.state = reactive({
            ...TableState.initTableState,
            ...this.initData,
        });
    }
}
