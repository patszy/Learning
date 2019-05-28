			var my_canvas = document.createElement('canvas');
			layout()
			window.addEventListener('resize', layout, false);
			
			var touches = [];
			var global_target_r = 0.4;
			//
			// W zależności czy urządzenie obsługuje dotyk czy nie dodaję różne Listenery
			if(!Modernizr.touch){
				window.addEventListener('mousemove', onMove, false);
				// Wstawiam pierwszy punkt „ręcznie”
				touches.push({pageX:Math.round(my_canvas.width/2), pageY:Math.round(my_canvas.height/2)})
			}else{
				window.addEventListener('touchstart', onMove, false);
				window.addEventListener('touchend', onMove, false);
				window.addEventListener('touchmove', onMove, false);
			}
			// 
			//
			//
			document.body.appendChild(my_canvas);
			var ctx = my_canvas.getContext('2d');
			var wszystkieKwadraty = [];

			var widoczneKwadraty = [];
			var fps = 30;
			//
			var ease = 'easeOutQuart';
			// 
			var lastTime = 0;			
			animationLoop();
			function animationLoop(time){
				requestAnimationFrame( animationLoop );
				if(time-lastTime>=1000/fps){
					lastTime = time;
					//
					ctx.clearRect(0,0,my_canvas.width, my_canvas.height);
					widoczneKwadraty.length = 0;
					//
					global_target_r = Math.min(0.4, global_target_r+0.01);
					//
					// Dodajemy nowy kwadrat tylko, jeśli istnieją jakieś punkty dotykowe (w przypadku urządzenia bez obsługi dotyku, jeden punkt dodaliśmy sami)
					if(touches.length>0){
						for (var i=0; i<10; i++) {
								// dla każdego kwadratu losuję jeden punkt dotykowych
								var p = touches[ rand(0,touches.length-1) ]

								wszystkieKwadraty.push({
								// Zamiast konkretnej wartości przypiszemy wartość zmiennych pageX i pageY wylosowanego dotyku.
								start_x:p.pageX/my_canvas.width,
								start_y:p.pageY/my_canvas.height,
								//
								// Docelowy promień też nie będzie miał przypisywanej zawsze tej samej wartości.
								target_r:global_target_r,
								//
								h:rand(5,15),
								start_a:rand(0,360),
								t:0,
								d:2000,
								start_r:255,
								start_g:rand(0,240),
								start_b:rand(0,100)
							});
						}
					}
					for (var i=0; i<wszystkieKwadraty.length; i++) {
						var kwadrat = wszystkieKwadraty[i];
						//
						kwadrat.t+=1000/fps;
						//
						kwadrat.r = Easing.get(ease, 0, Math.round(kwadrat.target_r*my_canvas.height), kwadrat.t, kwadrat.d);
						//
						kwadrat.a = Easing.get(ease, kwadrat.start_a, kwadrat.start_a+180, kwadrat.t, kwadrat.d);
						//
						kwadrat.x = Math.sin(Math.PI/180*kwadrat.a)*kwadrat.r+kwadrat.start_x*my_canvas.width;
						kwadrat.y = Math.cos(Math.PI/180*kwadrat.a)*kwadrat.r+kwadrat.start_y*my_canvas.height;
						// 
						ctx.fillStyle = 'rgba('+kwadrat.start_r+','+kwadrat.start_g+','+kwadrat.start_b+',1)';
						ctx.fillRect(kwadrat.x-kwadrat.h/2 ,kwadrat.y-kwadrat.h/2, kwadrat.h, kwadrat.h);
						if(kwadrat.t<kwadrat.d){
							widoczneKwadraty.push(kwadrat)
						}
					}
					wszystkieKwadraty = widoczneKwadraty.concat();
				}
			}
			// Przy każdym dotyku chcemy zmienić źródło kwadracików.
			function onMove(event){
				// Jeśli funkcję odpalił ruch myszki
				if(event.type=='mousemove'){
					touches[0].pageX = event.x;
					touches[0].pageY = event.y;
				}else{ // W innym przypadku musiało to być zdarzenie dotykowe.
					touches = event.touches;
					event.preventDefault()
				}
				//
				global_target_r = Math.max(0.1, global_target_r-0.01);
			} 
			function layout(event){
				my_canvas.width = window.innerWidth;
				my_canvas.height = window.innerHeight;
			}
			function rand(min,max){
				return Math.floor(Math.random()*(max-min+1))+min;
}
