var filterText = ko.observable("");
var map,InfoWindow;
var apiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=f7e8a625301e4a5eb74d4f10564eddd3&q=";


var placesData = [{
        title: 'Tiananmen Square',
        position: {lat:39.9087853140, lng:116.3975743822}
    },{
        title: 'Hangzhou Zoo',
        position: {lat:30.2133279664, lng:120.1352649511}
    },{
        title: 'White tower',
        position: {lat:30.1994463928, lng:120.1424736111}
    },{
        title: 'Pagoda',
        position: {lat:30.2312701188, lng:120.1485692434}
    },{
        title: 'Linan City ruins',
        position: {lat:30.2327545686, lng:120.1701231748}
    },{
        title: 'Hangzhou West Lake',
        position: {lat:30.220671, lng:120.108478}
    }
];

var Place = function(data){
    var self = this;

    this.title = data.title;    //获取data的名称
    this.position = data.position;//获取data的定位
    this.visible = ko.computed(function(){
        var placeName = self.title.toLowerCase();
        var re = filterText().toLowerCase();
        return(placeName.indexOf(re) != -1)
    });

    this.marker = new google.maps.Marker({          //地图标点
        position:self.position,
        title:self.title,
        animation:google.maps.Animation.DROP        //加载时动画
    });

     google.maps.event.addListener(self.marker, "click", function(){        //点击标点出现内容
        infowindow.setContent(self.title);
        infowindow.open(map,self.marker);

        if (self.marker.getAnimation() != null) {
            self.marker.setAnimation(null)
        }else{
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                self.marker.setAnimation(null);
            },2000);
        };
        $.ajax({
            url:apiUrl + self.title,
            dataType:"json",
            Timeou:2000
        }).done(function(data){
             if (data != null) {    //数据拼接
                var snippet = data.response.docs[0].snippet;
                var source = data.response.docs[0].source;
                var item = "<ul style='list-style:none;'>";
                item += "<li>snippet :"+ snippet +"</li>";
                item += "<li>source :"+ source +"</li>";
                item += "</ul>";
                infowindow.setContent(item);    //将所有信息集合显示
                infowindow.open(map,self.marker);
            } else {
                infowindow.setContent(self.title);    //如果为null只显示名字
                infowindow.open(map,self.marker);
            }

        }).fail(function() {
            alert('Api loading error!');    //错误提示
        }).always(function() {
            console.log("complete");
        });
     });
}

var ViewModel = function(){
    var self = this;
    this.placesList = [];
    placesData.forEach(function(data){
        self.placesList.push(new Place(data));
    });

    self.placesList.forEach(function(place){
        place.marker.setMap(map,place.position)     //地图标点
    })

    this.filteredList = ko.computed(function(){
        var result = [];
        self.placesList.forEach(function(place){
            if(place.visible()){        //当搜索时只显示搜索地点的标点，其他隐藏
                result.push(place);
                place.marker.setMap(map,place.position);
            }else{
                place.marker.setMap(null);
            }
        });
        return result;
    })

    this.listClick = function(place){
        google.maps.event.trigger(place.marker,"click");        //搜索条的点击事件
    }
}

function start(){
    map = new google.maps.Map(document.getElementById('map'),{center:placesData[5].position,zoom:12});      //加载地图并设置显示的是底6个marker，和视图等级
    infowindow = new google.maps.InfoWindow();
    ko.applyBindings(new ViewModel());      //绑定数据
}

mapError = function() {
    alert('Map loading error!');    //错误提示
}