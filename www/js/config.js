angular.module('starter.config', [])

.constant('Config', {

	URL: {
		BASE_URL: 'http://localhost/',
		LOGIN: 'http://localhost/AppelTaxi1/v1/login',
		REGISTREPASSAGER: 'http://localhost/AppelTaxi1/v1/registerPassager',
		TAXI : 'http://localhost/AppelTaxi1/v1/AjoutTaxi',
		GetTAXI : 'http://localhost/AppelTaxi1/v1/getTousTaxiUser/',
		DELETETAXI : 'http://localhost/AppelTaxi1/v1/deleteTaxi/',
		GetIDTAXI : 'http://localhost/AppelTaxi1/v1/getidTaxi/',
		PUTTAXI:'http://localhost/AppelTaxi1/v1/putTaxi/',
		PUTUSER:'http://localhost/AppelTaxi1/v1/putUser',
		getUserAFFECT:'http://localhost/AppelTaxi1/v1/getListeChauffeur/',
		AJOUTAFFECT:'http://localhost/AppelTaxi1/v1/AjoutAffectation',
		GETAFFECTATION:'http://localhost/AppelTaxi1/v1/getAffectation/',
		GETTAXIDISPONIBLE:'http://localhost/AppelTaxi1/v1/TaxiDisponible',
		RESAVANCE:'http://localhost/AppelTaxi1/v1/ResAvance',
        GETRESPASSAGERAVANCE:'http://localhost/AppelTaxi1/v1/getHistResAvancePassager/',
        RESERVATIONTEMPS : 'http://localhost/AppelTaxi1/v1/AjoutReservationTemps',
	}

});

