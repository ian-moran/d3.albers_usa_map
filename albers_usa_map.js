/**
 * @file
 * Javascript for [library name]. 
 */

(function($) {

  /**
   * Adds library to the global d3 object.
   *
   * @param select
   * @param settings
   *   Array of values passed to d3_draw. 
   *   id: required. This will be needed to attach your 
   *       visualization to the DOM.
   */
  Drupal.d3.albers_usa_map = function (select, settings) {
    var rows = settings.rows;
    var width = 960,
    height = 500;

    var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

    var path = d3.geo.path()
    .projection(projection);
    
    div = (settings.id) ? settings.id : 'visualization';

    var svg = d3.select('#' + div).append("svg")
    .attr("width", width)
    .attr("height", height);
    
    var g = svg.append("g");

    d3.json("/sites/all/libraries/d3.albers_usa_map/topojson/state.json", function(error, us) {

      g.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.state).features)
      .enter().append("path")
      .attr({id:function(d){
        return d.id;
        },
        class:"state-boundary"})
      .attr("d", path)
      .on({"click":function(d){
          console.log(rows);
          var h2 = document.createElement('h2');
          h2.className = 'state';
          h2.innerHTML = d.properties.NAME10;
          $("#states-info").empty();
          $("#states-info").append(h2);
          for(i=0; i < rows.length; i++){
            if(rows[i]['state'] == d.id){
              var div = document.createElement('div');
              div.className = 'content';
              div.innerHTML = rows[i]['content'];
              $("#states-info").append(div);
              var match = 1
            }
          }
          if(match != 1){
            var div = document.createElement('div');
            div.className = 'content';
            div.innerHTML = "We currently do not have any information for this State.";
            $("#states-info").append(div);
          }
        }
      });
    });
    
  };

})(jQuery);
