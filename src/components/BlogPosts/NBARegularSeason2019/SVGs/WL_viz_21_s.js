// // rollup static/js/nba_reg_19/WL_viz_21_s.js --file static/js/nba_reg_19/WL_viz_21.js --format iife

// import {
//     csv,
//     select,selectAll,
//     scaleLinear, scaleBand, scaleTime,
//     axisBottom,
//     axisLeft,
//     format,
//     easeCubic,
//     drag,
//     timeFormat,
//     easeLinear,
//     easeCubicInOut,
//     easeExpIn,
//     filter,
//     line
//   } from 'd3';
// import { dropdownMenu } from '../dropdownMenu.js';
// import { radioGroup } from '../radioGroup.js';
// // import { wrap } from './textWrap.js';

// // vars //
// var team_data, team_colors = {}, team_icons = {}, western_teams = [], eastern_teams = [], WL_data, notes_data;
// var filteredTeams = [], filteredTeamNames = [], filteredTeamNames2 = [], filteredWL, filteredWL2 = [], dateWL;
// var notes, timer;
// const speeds = [1000,2000,3000];
// const splits = [
//     'Entire League',
//     'Eastern Conference',
//     'Western Conference',
//     'Atlantic Division',
//     'Central Division',
//     'Southeast Division',
//     'Northwest Division',
//     'Pacific Division',
//     'Southwest Division'
// ];
// const nonbubble_teams = [
//     'Charlotte Hornets', 
//     'Minnesota Timberwolves', 
//     'Chicago Bulls',
//     'Golden State Warriors',
//     'New York Knicks',
//     'Detroit Pistons',
//     'Atlanta Hawks',
//     'Cleveland Cavaliers'
// ];
// var split = 'League';
// var bar_size = 1;
// const margin = {top: 100, right: 50, bottom: 50, left: 120},
//     width = 950 - margin.left - margin.right,
//     height = 650 - margin.top - margin.bottom;
// const notes_width = width * 3/4;
// var startDate = new Date("2019-10-22"), // scaleTime starts 1 day before
//     endDate = new Date("2020-08-18");
// var currDateDate = startDate;
// var step_speed = 3000;
// var anim_speed = step_speed * 0.5;

// // svg //
// const svg = select("#svg-reg");

// // fns //
// var formatDateIntoMonth = timeFormat("%B");
// var formatDate = timeFormat("%m/%d/%Y");
// var format500 = format('.3f');
// const onSplitClicked = selection => {
//     split = selection; // update y val to be selected
//     const level = split.split(' ')[1]
//     const region = split.split(' ')[0]
//     filteredTeamNames = [];
//     if (level == "League"){
//         filteredTeams = team_data;
//         filteredTeams.forEach(t => {
//             filteredTeamNames.push(t.full_name);
//         })
//         bar_size = 1;
//     }
//     else if (level == "Conference"){
//         filteredTeams = [];
//         team_data.forEach(t => {
//             if (t.Conference == region){
//                 filteredTeams.push(t);
//                 filteredTeamNames.push(t.full_name);
//             }
//         });
//         bar_size = 2;
//     }
//     else{
//         filteredTeams = [];
//         team_data.forEach(t => {
//             if (t.Division == region){
//                 filteredTeams.push(t);
//                 filteredTeamNames.push(t.full_name);
//             }
//         });
//         bar_size = 3;
//     }
//     // console.log('splitclickFT',filteredTeams);
//     // var filteredTeamNamesTemp = [];
//     // filteredTeams.forEach(t => filteredTeamNamesTemp.push(t.full_name));
//     // filteredTeamNames = filteredTeamNamesTemp;
//     filteredTeamNames2 = filteredTeamNames;
//     render();
//   };

// const onSpeedSelected = selection => {
//     step_speed=selection;
//     anim_speed = step_speed * 0.5;
//     // console.log(step_speed,anim_speed);
//     // console.log(step_speed);
//     // if (regButtonText.text == "Pause"){
//     clearInterval(timer);
//     timer = setInterval(step, step_speed);
//     // } 
//     regButtonText.text("Pause").attr("x", 10);;
// }

// // get WL for each team for given date
// function update_WL(game_date){
//     currDateDate = tScale.invert(currentDate);
//     // update handle and label
//     handle.attr("cx", tScale(game_date));
//     label
//         .attr("x", tScale(game_date))
//         .text(formatDate(game_date));
//     // format date to day spec
//     const game_date_day = formatDate(game_date);

//     // get notes fort date
//     notes_data.forEach(note =>{
//         if(Date.parse(note.Date) <= Date.parse(game_date_day)){
//             notes = note.Notes;
//         };
//     })
//     // get WL for date from WL_data
//     dateWL = WL_data[0];
//     WL_data.forEach(d => {
//         // some dates are undefined, so round to closest previous date
//         if(Date.parse(d.Date) <= Date.parse(game_date_day)){
//             dateWL = d;
//         }
//     });

//     // convert to correct AoO format
//     filteredWL = Object.entries(dateWL).map(([team,WL]) => ({team,WL}));
//     dateWL = filteredWL;
//     // filteredWL.shift();
//     filteredWL.forEach(f => { // add icon
//         f['icon'] = team_icons[f.team];
//     });
//     filteredWL.sort((a,b) => b.WL - a .WL)
    
//     // filter WL by split
//     var filteredWLtemp = [];
//     filteredWL.forEach(d => {
//         if(filteredTeamNames.includes(d.team)){
//             filteredWLtemp.push(d);
//         }
//     })
//     filteredWL = filteredWLtemp;

//     // also update names to reorder bars for graph 
//     var filteredTeamNamesTemp = [];
//     filteredWL.forEach(t => filteredTeamNamesTemp.push(t.team));
//     // console.log('ftnt',filteredTeamNamesTemp);
//     filteredTeamNames = filteredTeamNamesTemp;
//     render()
// }

// function step() {
//     currDateDate = tScale.invert(currentDate);
//     update_WL(currDateDate); // update bars
//     currentDate = currentDate + (targetDate/301); // move currentDate 1 days
//     // call progress bar to run 2 seconds for delay
//     // stopWatch(3000);
//     if (currentDate > targetDate) { // reset date
//       moving = false;
//       currentDate = 0;
//       clearInterval(timer);
//       // timer = 0;
//       regButtonText.text("Start");
//     }
//   }

// //get's 8th place WL for each conference
// function get_8_seed(WL){
//     let eastern_WL = [];
//     let western_WL = [];
//     WL.forEach(t => {
//         if(eastern_teams.includes(t.team)){
//             eastern_WL.push(t);
//         }
//         if(western_teams.includes(t.team)){
//             western_WL.push(t);
//         }
//     });
//     // return 8th seed WL
//     console.log('confWL',eastern_WL,western_WL);
//     return [{"conference": 'east', "team": eastern_WL[7].team,"WL": eastern_WL[7].WL},
//             {"conference": 'west', "team": western_WL[7].team,"WL": western_WL[7].WL}];
// }

// // skip to given data
// function skip_to_date(date_str){
//     console.log('skiptodate');
//     const skip_date = new Date(date_str);
//     currentDate = tScale(skip_date); // update current scaled date to skip
//     currDateDate = tScale.invert(currentDate); // as well as actual date
//     console.log(currentDate);
//     console.log(currDateDate);
//     // call update_WL
//     update_WL(skip_date);
// }


// // slider and regButton//
// var moving = false;
// var currentDate = 0;
// var targetDate = width;

// const tScale = scaleTime()
//     .domain([startDate, endDate])
//     .range([0, targetDate])
//     .clamp(true);

// const g_btn = svg.append("g")
//     .attr('transform',
//     `translate(20, 35)`);

// const regButton = g_btn.append('rect')
//     .attr('id','reg-szn-btn')
//     .attr('class','play-btn')
//     .attr('fill','#FE7201')
//     .text('Start');
// const regButtonText = g_btn.append('text')
//     .attr("x", 13)
//     .attr("y", 20)
//     .attr("fill",'white')
//     .attr('class','play-btn-text')
//     .text('Start');

// regButtonText.on("mouseover",function(){
//     regButton.attr("fill","black");
// });
// regButtonText.on("mouseout",function(){
//     regButton.attr("fill","#FE7201");
// });

// g_btn.on("click", function() {
//     // var button = select(this);
//     if (regButtonText.text() == "Pause") {
//       moving = false;
//       clearInterval(timer);
//       // timer = 0;
//       regButtonText.text("Start").attr("x",13);
//     } else {
//       moving = true;
//       // update timer to be dynamic (i.e. fast forward suspension)
//       timer = setInterval(step, step_speed); 
//       regButtonText.text("Pause").attr("x", 10);
//     }
// });

// const notesDisplay = select('#notes-display');
// const svgSkip = select('#svg-skip');
// svgSkip
//     .attr('width',60)
//     .attr('height',30);
// const skip_btn = svgSkip.append("g");

// const skipButton = skip_btn.append('rect')
//     .attr('id','skip-btn')
//     .attr('class','play-btn')
//     .attr('fill','#FE7201')
//     .text('Skip');
// const skipButtonText = skip_btn.append('text')
//     .attr("x", 15)
//     .attr("y", 20)
//     .attr("fill",'white')
//     .attr('class','play-btn-text')
//     .text('Skip');
// skip_btn.style("visibility","hidden");

// skipButtonText.on("mouseover",function(){
//     skipButton.attr("fill","black");
// });
// skipButtonText.on("mouseout",function(){
//     skipButton.attr("fill","#FE7201");
// });

// skip_btn.on("click", function() {
//     // console.log('dateis'+currDateDate);
//     let skipDate;
//     if(currDateDate >= new Date("2020-2-14") & currDateDate < new Date("2020-2-19")){
//         skipDate = "2020-2-19";
//     }
//     else{
//         skipDate = "2020-7-30"; 
//     }
//     skip_to_date(skipDate);
// });

// var slider = svg.append("g")
//     .attr("class", "slider")
//     .attr("transform", "translate(" + margin.left + "," + 50 + ")");

// slider.append("line")
//     .attr("class", "track")
//     .attr("x1", tScale.range()[0])
//     .attr("x2", tScale.range()[1])
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-inset")
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-overlay")
//     .call(drag()
//         .on("start.interrupt", function() { slider.interrupt(); })
//         .on("start drag", function(event,d) { // d3 6.0 migration
//             currentDate = event.x;
//             // console.log(event.x);
//             update_WL(tScale.invert(currentDate)); 
//         })
//     );

// slider.insert("g", ".track-overlay")
//     .attr("class", "ticks")
//     .attr("transform", "translate(0," + 18 + ")")
//   .selectAll("text")
//     .data(tScale.ticks(10))
//     .enter()
//     .append("text")
//     .attr("x", tScale)
//     .attr("y", 10)
//     .attr("text-anchor", "middle")
//     .text(function(d) { return formatDateIntoMonth(d); });

// var handle = slider.insert("circle", ".track-overlay")
//     .attr("class", "handle")
//     .attr("r", 8);

// var label = slider.append("text")  
//     .attr("class", "label")
//     .attr("text-anchor", "middle")
//     .text(formatDate(startDate))
//     .attr("transform", "translate(0," + (-25) + ")")

// // one-time renders
// // create svg
// svg
//     .attr('width',width + margin.left + margin.right)
//     .attr('height',height + margin.top + margin.right)
// const g_main = select("#main-g"); 
// g_main
//     .attr('transform',
//     `translate(${margin.left}, ${margin.top})`);
// // x axis DN change
// const xScale = scaleLinear()
//     .domain([0,1])
//     .range([0, width]);
// // create x axis
//  g_main.append("g")
//  .attr('class','xaxis')
//  .attr("transform", "translate(0," + height + ")")
//  .call(axisBottom(xScale)
//  .ticks(20)
//  .tickFormat(format500)
//  .tickSize(-height));
// // populate dropdown menu
// select('#splits-menu')
//     .call(dropdownMenu,{
//     options: splits,
//     onOptionClicked: onSplitClicked,
//     selectedOption: split,
//     label: 'Only Teams from: '
//     });
// // populate speed buttons
// select('#speed-btns')
//     .call(radioGroup,{
//         values: speeds,
//         onValueChanged: onSpeedSelected,
//         checkedValue: speeds[2] // slowest speed
//     });

// const render = () =>{
//     // filter out teams using filteredTeams from filteredWL
//     filteredWL2 = [];
//     filteredWL.forEach(t => {
//         if(filteredTeamNames.includes(t.team)){
//             // console.log('not',t.team);
//             filteredWL2.push(t);
//         }
//     });
//     filteredWL2.sort((a,b) => b.WL - a .WL)// sort bars IN RENDER
//     // console.log('fwl2',filteredWL2); 
//     // remake FTN to sort team names in render to reorder bars
//     filteredTeamNames2 = [];
//     filteredWL2.forEach(t => filteredTeamNames2.push(t.team));
//     // console.log(filteredTeamNames2);

//     // create/update y scale
//     const yScale = scaleBand()
//         // .domain(filteredTeams.map(d => d.full_name))
//         .domain(filteredTeamNames2)
//         .range([0, height])
//         .padding(0.2);
//     // create y axis
//     g_main.append("g")
//         .attr('class','yaxis');
//     // update axis
//     svg.select("g.yaxis")
//         .transition()
//         .duration(anim_speed)
//         .ease(easeCubic)
//         .call(axisLeft(yScale));

//     // join 8th seed line
//     let WL_8 = get_8_seed(dateWL);
//     // console.log('WL_8',WL_8);
    
//     var WL_8_lines = g_main.selectAll(".WL_8_line")
//         .data(WL_8, d=>d.conference);

//     WL_8_lines
//         .enter()
//         .append("line")
//             .attr("class",'WL_8_line')
//             .attr("y1",height)
//             .attr("y2",height)
//             .style("stroke-width", 1)
//             .style("stroke", d=> {
//                 if(d.conference == 'east'){
//                     return "#03319F";
//                 }
//                 else{
//                     return "#D80025"; 
//                 }
//             })
//             .style("fill", "none")
//         .merge(WL_8_lines)
//             .style("stroke-dasharray", ("2, 2"))
//             .transition()
//             .delay( function(d,i){
//                 return i / 2 * anim_speed;
//             })
//             .duration(anim_speed)
//             .ease(easeCubic)
//                 .attr("x1",d => xScale(d.WL))
//                 .attr("x2",d => xScale(d.WL))
//                 .attr("y2",d => yScale(d.team))
//     WL_8_lines.exit().remove();
//     // join 8th seed team and WL
//     var WL_8_teams = g_main.selectAll(".WL_8_text")
//         .data(WL_8, d=>d.conference);
//     WL_8_teams
//         .enter()
//         .append("text")
//             .attr("class", "WL_8_text")//easy to style with CSS
//             .attr("y", (d,i) => height + 10 + (i + 1) * 15)//magic number here
//             .attr('text-anchor', 'middle')
//             .style("fill", d=> {
//                 if(d.conference == 'east'){
//                     return "#03319F";
//                 }
//                 else{
//                     return "#D80025"; 
//                 }
//             })
//         .merge(WL_8_teams)
//             .transition()
//                 .delay( function(d,i){
//                     return i / 2 * anim_speed;
//                 })
//                 .duration(anim_speed)
//                 .ease(easeCubic)
//                     .attr("x", d => xScale(d.WL))
//                     .text(d => d.team + ": " + parseFloat(d.WL).toFixed(3));  
//     WL_8_teams.exit().remove();

//     // join bars
//     var bars = g_main.selectAll("rect")
//         .data(filteredWL2,d => d.team);
//     bars
//         .enter()
//         .append("rect")
//             .attr("id", d => d.team + "-bar")
//             .attr("y",d => yScale(d.team))
//             .attr("height",yScale.bandwidth())
//             .attr("opacity","0.1")
//             .attr("fill",d => team_colors[d.team])
//         .merge(bars)
//             .transition()
//             .delay( function(d,i){
//                 return i / team_data.length * anim_speed;
//             })
//             .duration(anim_speed)
//             .ease(easeCubic)
//                 .attr("width",d => {
//                     if(d.WL == 0){
//                         return xScale(0.003);
//                     }
//                     else{
//                         return xScale(d.WL);
//                     }
//                 })
//                 .attr("y",d => yScale(d.team))
//                 .attr("height",yScale.bandwidth())
//                 .attr("opacity","1")
//                 .attr("fill",d => team_colors[d.team]);
//     bars.exit()
//         .transition()
//             .attr("width", xScale(0))
//             .attr("opacity","0.1")
//             .attr("fill",d => team_colors[d.team])    
//         .delay( function(d,i){
//             return i / team_data.length * anim_speed / 2;
//         })
//         .duration(anim_speed / 2)
//         .ease(easeCubic)
//         .remove()

//     // join icons 
//     var icons = g_main.selectAll('image')
//         .data(filteredWL2,d => d.team);
//     icons
//         .enter()
//         .append('svg:image')
//             .attr('xlink:href',d => d.icon)
//             .attr('x',0)
//             .attr('y',d => yScale(d.team))
//             .attr('width',0)
//             .attr('height',0)
//             .attr("opacity","0.1")
//             .attr('alt',d=>d.full_name)
//         .merge(icons)
//             .transition()
//             .delay( function(d,i){
//                 return i / team_data.length * anim_speed;
//             })
//             .duration(anim_speed)
//             .ease(easeCubic)
//                 .attr('x',d => xScale(d.WL))
//                 .attr('y',d => yScale(d.team))
//                 // .attr('transform',
//                 // `translate(0, ${-yScale.bandwidth()/2})`)
//                 .attr('width',d => {
//                     let w = yScale.bandwidth();
//                     if(bar_size == 2){
//                         w = w * 1.5;
//                     }
//                     if(bar_size == 1){
//                         w = w * 2;
//                     }
//                     return w;
//                 })
//                 .attr('height',d => {
//                     let h = yScale.bandwidth();
//                     if(bar_size == 2){
//                         h = h * 1.5;
//                     }
//                     if(bar_size == 1){
//                         h = h * 2;
//                     }
//                     return h;
//                 })
//                 .attr('transform', d=>{
//                     let y = 0;
//                     if(bar_size == 2){
//                         y = -yScale.bandwidth() / 2 / 1.5;
//                     }
//                     if(bar_size == 1){
//                         y = -yScale.bandwidth() / 2;
//                     }
//                     return `translate(0, ${y})`;
//                 })
//                 .attr("opacity","1");
//     icons.exit()
//         .transition()
//             .attr('x',0)
//             .attr("width",0)
//             .attr("height",0)
//             .attr("opacity","0.1")    
//         .delay( function(d,i){
//             return i / team_data.length * anim_speed / 2;
//         })
//         .duration(anim_speed / 2)
//         .ease(easeCubic).remove();
    
//     // join notes
//     if (step_speed >= 3000){
//         notesDisplay
//             .text(notes);
//     }
//     else{
//         notesDisplay
//             .text('(Annotations only for 3 second speed)');
//     }

//     // show/hide skip button for szn pauses
//     console.log("currentDate" +  currDateDate);
//     if ((currDateDate >= new Date("2020-2-14") & currDateDate < new Date("2020-2-19"))
//         || (currDateDate >= new Date("2020-3-11") & currDateDate < new Date("2020-7-30"))){
//         // show skip btn
//         skip_btn.style("visibility","visible");
//     }
//     else{ // hide skip btn
//         skip_btn.style("visibility","hidden");
//     }

// };

// // load notes
// csv('../static/data/nba_reg_season_2019-20/WL2019_20notes.csv')
//     .then(data => {
//         notes_data = data;
//         notes = notes_data[0].Notes;
//         console.log('notes',notes);
//     });

// // load team data
// csv('../static/data/nba_reg_season_2019-20/team_data.csv')
//     .then(data => {
//         data.forEach(d => {
//             d.colors = d.colors.split("'")[1];
//             d.icon = '/static/images/blog_posts/nba_reg_season_2019-20/team_logos/' + d.abbreviation + '-logo.png'
//             team_colors[d.full_name] = d.colors;
//             team_icons[d.full_name] = d.icon;
//             filteredTeamNames.push(d.full_name);
//             if(d.Conference == 'Eastern'){
//                 eastern_teams.push(d.full_name);
//             }
//             else{
//                 western_teams.push(d.full_name);
//             }
//         })
//         team_data = data;
//         filteredTeams = team_data;
//         filteredTeamNames2 = filteredTeamNames;
//         console.log('fTeams',filteredTeams);     
//     });

// // load WL data
// csv('../static/data/nba_reg_season_2019-20/WL2019_20.csv')
//     .then(data => {
//         WL_data = data;
//         console.log('WL:', WL_data);
//         filteredWL = data[0];
//         delete filteredWL['Date'];
//         filteredWL = Object.entries(filteredWL).map(([team,WL]) => ({team,WL}));
//         dateWL = filteredWL;
//         filteredWL.forEach(f => { // add icon
//             f['icon'] = team_icons[f.team];
//         });
//         console.log('FWL:', filteredWL);
//         render();
//     });

