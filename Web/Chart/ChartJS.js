function drawChart() {
    var defaultText = '[{"月":"二月","第一測試項目":1,"第二測試項目":1},{"月":"三月","第一測試項目":6,"第二測試項目":5},{"月":"三月","第一測試項目":15,"第二測試項目":12}]';
    /////////////////將Text轉為Google Chart指定格式
    var JSONArray = JSON.parse(defaultText);
    var JSONFieldArray =Object.keys(JSONArray[0]);
    var JSONChartData = [JSONFieldArray];
    for(JSONArrayi = 0 ;JSONArrayi <JSONArray.length;JSONArrayi++){
        var JSONChartDataArray =[];
        for(JSONChartDatai =0; JSONChartDatai <JSONFieldArray.length;JSONChartDatai++){
            JSONChartDataArray.push(JSONArray[JSONArrayi][JSONFieldArray[JSONChartDatai]]);
        }
        JSONChartData.push(JSONChartDataArray);
    }



    /////////////////////////////////////////////
    var data = google.visualization.arrayToDataTable(JSONChartData);
    var options = {
        title: '月份分析',
        hAxis: {title: '類型：折線圖',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };
    document.getElementById('chart_Array').innerHTML =JSON.stringify(JSONChartData);
    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}