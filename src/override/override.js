
// TMDB

const API_KEY = 'api_key=800e6425fa9014983a695f3dcb66d379';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY ;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL_2 = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY ;
const API_URL_3 = BASE_URL + '/movie/upcoming/?' + API_KEY;
const movieRow = document.getElementById('movie-row');
const seriesRow = document.getElementById('series-row');
const bigRow = document.getElementById('big-col');
const backGround = document.getElementById('background-img');
const small = document.getElementById('small-col')
const small2 = document.getElementById('small-col2')
const small3 = document.getElementById('small-col3')
const small4 = document.getElementById('small-col4')

getMovies(API_URL);
getSeries(API_URL_2);
getTodayPick(API_URL);
getUpcoming(API_URL_3);


function getSeries(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showTrendingSeries(data.results)
    })
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showTrendingMovies(data.results)
       
        
    })
}


function getTodayPick(url) {
    fetch(url).then(res => res.json()).then(data => {
		let index = Math.floor(Math.random() *data.results.length);
        console.log(data.results[index]);
        showTodayPick(data.results[index]);
        backdrop(data.results[index])
        
    })
}

function getUpcoming(url) {
    fetch(url).then(res => res.json()).then(data => {
		let index = Math.floor(Math.random() *data.results.length);
        console.log(data.results[index]);
        showUpcoming(data.results[index]);
		showUpcoming2(data.results[index+1]);
		showUpcoming3(data.results[index+2]);
		showUpcoming4(data.results[index+3]);
        
        
    })
}


function showTrendingMovies(data){

    movieRow.innerHTML = '';
    console.log(data);
    data.forEach(movie => {
        const {title, poster_path,vote_average,release_date,id} = movie;

		var url = BASE_URL + '/movie/' + `${id}` + '/videos?' + API_KEY ;
  		fetch(url).then(res => res.json()).then(video => {
		console.log(video.results[0])
		const {key} = video.results[0];

        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-col');
        movieEl.innerHTML = `
    <div class="movie-card">
        <div class="movie-header"  style= "background-image: url(${IMAGE_URL+poster_path});">
							<div class="header-icon-container">
								<a href="https://www.youtube.com/watch?v=${key}" target="blank">
									<i class="material-icons header-icon"></i>
								</a>
							</div>
						</div><!--movie-header-->
						<div class="movie-content">
							<div class="movie-content-header">
								<a href="#">
									<h3 class="movie-title">${title}</h3>
								</a>
								<div class="rating">${vote_average}</div>
							</div>
							<div class="movie-info">
									<!-- date released -->
									<label>Date released:</label>
									<span>${release_date}</span>
				
                                  
							</div>
						</div>
                    </div>
        `

        movieRow.appendChild(movieEl);

		

     
        
		  })
       
})

}




function showTrendingSeries(data){

    seriesRow.innerHTML = '';

    data.forEach(tv => {
        const {name, poster_path,vote_average,first_air_date,id} = tv;

		var url = BASE_URL + '/tv/' + `${id}` + '/videos?' + API_KEY ;
  		fetch(url).then(res => res.json()).then(video => {
		console.log(video.results[0])
		const {key} = video.results[0];

        const seriesEl = document.createElement('div');
        seriesEl.classList.add('series-col');
        seriesEl.innerHTML = `
    <div class="movie-card">
        <div class="movie-header"  style= "background-image: url(${IMAGE_URL+poster_path});">
							<div class="header-icon-container">
								<a href="https://www.youtube.com/watch?v=${key}" target="_blank">
									<i class="material-icons header-icon"></i>
								</a>
							</div>
						</div><!--movie-header-->
						<div class="movie-content">
							<div class="movie-content-header">
								<a href="#">
									<h3 class="movie-title">${name}</h3>
								</a>
								<div class="rating">${vote_average}</div>
							</div>
							<div class="movie-info">
									<!-- date released -->
									<label>Date released:</label>
									<span>${first_air_date}</span>
				
                                    
                                    
                                   
							</div>
						</div>
                    </div>
        `

       seriesRow.appendChild(seriesEl);
		  })
       
})

}

function showTodayPick(data){

    bigRow.innerHTML = '';

	    

        const {title, poster_path,vote_average,release_date,overview,id} = data;
		
		var url = BASE_URL + '/movie/' + `${id}` + '/videos?' + API_KEY ;
  		fetch(url).then(res => res.json()).then(video => {
		console.log(video.results[0])
		const {key} = video.results[0];
        const bigEl = document.createElement('div');
        bigEl.classList.add('todayPick');
        bigEl.innerHTML = `
        <div class="bg-movie-card">
		<div class="bg-movie-header" style="background-image: url(${IMAGE_URL+poster_path});">
			<div class="header-icon-container">
			<a href="https://www.youtube.com/watch?v=${key}" target="blank">
			<i class="material-icons bg-header-icon"></i>
			</a>
			</div>
		</div><!--movie-header-->
		<div class="movie-content">
			<div class="movie-content-header">
				<a href="#">
					<h3 class="movie-title">${title}</h3>
				</a>
				<div class="rating">${vote_average}</div>
			</div>
			<div class="movie-info">
				    <!-- date released -->
					<label>Date released:</label>
					<span>${release_date}</span class="date-released">
				
					<p class="decription">
						${overview}
					</p>

					

			</div>
		</div><!--movie-content-->
	</div>
        `
	

       bigRow.appendChild(bigEl);

	   });
       
	

}



function backdrop(data){
	backGround.innerHTML = '';

	    

	const {backdrop_path} = data;
	const backEl = document.createElement('div');
	backEl.classList.add('backdrop');
	backEl.innerHTML = `
	<img src="${IMAGE_URL+backdrop_path}" class="background">
	`

   backGround.appendChild(backEl);
   
}

function showUpcoming(data){
	small.innerHTML = '';

	    

	const {poster_path,release_date,title} = data;


    
	const smallEl = document.createElement('div');
	smallEl.classList.add('small-container');
	smallEl.innerHTML = `
	<div class="sm-movie-card">
								<div class="sm-movie-header" style="background-image: url(${IMAGE_URL+poster_path});">
									<div class="header-icon-container">
										
									</div>
								</div><!--movie-header-->
								<div class="movie-content">
									<div class="movie-content-header">
										<a href="#">
											<h3 class="movie-title">${title}</h3>
										</a>
										
									</div>
									<div class="movie-info">
										<!-- date released -->
										<label>Date released:</label>
										<span>${release_date}</span class="date-released">
									
					
								</div>
									
								</div><!--movie-content-->
							</div>
	`

   small.appendChild(smallEl);

		 
   
}

function showUpcoming2(data){
	small2.innerHTML = '';

	    

	const {poster_path,release_date,title} = data;

	

	const smallEl2 = document.createElement('div');
	smallEl2.classList.add('small-container2');
	smallEl2.innerHTML = `
	<div class="sm-movie-card no-2">
								<div class="sm-movie-header" style="background-image: url(${IMAGE_URL+poster_path});">
									<div class="header-icon-container">
										
									</div>
								</div><!--movie-header-->
								<div class="movie-content">
									<div class="movie-content-header">
										<a href="#">
											<h3 class="movie-title">${title}</h3>
										</a>
										
									</div>
									<div class="movie-info">
										<!-- date released -->
										<label>Date released:</label>
										<span>${release_date}</span class="date-released">
									
					
								</div>
									
								</div><!--movie-content-->
							</div>
	`

   small2.appendChild(smallEl2);
		  
   
}

function showUpcoming3(data){
	small3.innerHTML = '';

	    

	const {poster_path,release_date,title} = data;

	

	const smallEl3 = document.createElement('div');
	smallEl3.classList.add('small-container3');
	smallEl3.innerHTML = `
	<div class="sm-movie-card no-3">
								<div class="sm-movie-header" style="background-image: url(${IMAGE_URL+poster_path});">
									<div class="header-icon-container">
										
									</div>
								</div><!--movie-header-->
								<div class="movie-content">
									<div class="movie-content-header">
										<a href="#">
											<h3 class="movie-title">${title}</h3>
										</a>
										
									</div>
									<div class="movie-info">
										<!-- date released -->
										<label>Date released:</label>
										<span>${release_date}</span class="date-released">
									
					
								</div>
									
								</div><!--movie-content-->
							</div>
	`

   small.appendChild(smallEl3);
		  
   
}

function showUpcoming4(data){
	small4.innerHTML = '';

	    

	const {poster_path,release_date,title} = data;

  		

	const smallEl4 = document.createElement('div');
	smallEl4.classList.add('small-container4');
	smallEl4.innerHTML = `
	<div class="sm-movie-card no-4">
								<div class="sm-movie-header" style="background-image: url(${IMAGE_URL+poster_path});">
									<div class="header-icon-container">
										
									</div>
								</div><!--movie-header-->
								<div class="movie-content">
									<div class="movie-content-header">
										<a href="#">
											<h3 class="movie-title">${title}</h3>
										</a>
										
									</div>
									<div class="movie-info">
										<!-- date released -->
										<label>Date released:</label>
										<span>${release_date}</span class="date-released">
									
					
								</div>
									
								</div><!--movie-content-->
							</div>
	`

   small4.appendChild(smallEl4);

		  
   
}