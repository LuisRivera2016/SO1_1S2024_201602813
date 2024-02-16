export namespace main {
	
	export class Ram {
	    totalRAM: number;
	    memoriaEnUso: number;
	    porcentaje: number;
	    libre: number;
	
	    static createFrom(source: any = {}) {
	        return new Ram(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.totalRAM = source["totalRAM"];
	        this.memoriaEnUso = source["memoriaEnUso"];
	        this.porcentaje = source["porcentaje"];
	        this.libre = source["libre"];
	    }
	}

}

