/* Tweet! ; GitHub: http://github.com/seaofclouds/tweet/ ; License: MIT */
(function(a){a.fn.tweet=function(b){function f(){if(c.list)return"//"+c.twitter_api_url+"/1/"+c.username[0]+"/lists/"+c.list+"/statuses.json?per_page="+c.count+"&callback=?";if(c.query==null&&c.username.length==1)return"//"+c.twitter_api_url+"/1/statuses/user_timeline.json?screen_name="+c.username[0]+"&count="+c.count+"&include_rts=1&callback=?";var a=c.query||"from:"+c.username.join(" OR from:");return"//"+c.twitter_search_url+"/search.json?&q="+encodeURIComponent(a)+"&rpp="+c.count+"&callback=?"}function e(a){var b=d(a),c=arguments.length>1?arguments[1]:new Date,e=parseInt((c.getTime()-b)/1e3),f="";e<60?f=e+" seconds ago":e<120?f="a minute ago":e<2700?f=parseInt(e/60,10).toString()+" minutes ago":e<7200?f="an hour ago":e<86400?f=""+parseInt(e/3600,10).toString()+" hours ago":e<172800?f="a day ago":f=parseInt(e/86400,10).toString()+" days ago";return"about "+f}function d(a){return Date.parse(a.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3"))}var c=a.extend({username:["seaofclouds"],list:null,avatar_size:null,count:3,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,query:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"search.twitter.com",template:function(a){return a.avatar+a.time+a.join+a.text}},b);a.fn.extend({linkUrl:function(){var b=[],c=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;this.each(function(){b.push(this.replace(c,function(a){var b=/^[a-z]+:/i.test(a)?a:"http://"+a;return'<a href="'+b+'">'+a+"</a>"}))});return a(b)},linkUser:function(){var b=[],d=/[\@]+([A-Za-z0-9-_]+)/gi;this.each(function(){b.push(this.replace(d,'<a href="http://'+c.twitter_url+'/$1">@$1</a>'))});return a(b)},linkHash:function(){var b=[],d=/(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;this.each(function(){b.push(this.replace(d,' <a href="http://'+c.twitter_search_url+"/search?q=&tag=$1&lang=all&from="+c.username.join("%2BOR%2B")+'">#$1</a>'))});return a(b)},capAwesome:function(){var b=[];this.each(function(){b.push(this.replace(/\b(awesome)\b/gi,'<span class="awesome">$1</span>'))});return a(b)},capEpic:function(){var b=[];this.each(function(){b.push(this.replace(/\b(epic)\b/gi,'<span class="epic">$1</span>'))});return a(b)},makeHeart:function(){var b=[];this.each(function(){b.push(this.replace(/(&lt;)+[3]/gi,"<tt class='heart'>&#x2665;</tt>"))});return a(b)}});return this.each(function(b,d){var g=a('<ul class="tweet_list">').appendTo(d),h='<p class="tweet_intro">'+c.intro_text+"</p>",i='<p class="tweet_outro">'+c.outro_text+"</p>",j=a('<p class="loading">'+c.loading_text+"</p>");typeof c.username=="string"&&(c.username=[c.username]),c.loading_text&&a(d).append(j),a(d).bind("load",function(){a.getJSON(f(),function(b){c.loading_text&&j.remove(),c.intro_text&&g.before(h),g.empty();var f=a.map(b.results||b,function(b){var d=c.join_text;c.join_text=="auto"&&(b.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)?d=c.auto_join_text_reply:b.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)?d=c.auto_join_text_url:b.text.match(/^((\w+ed)|just) .*/im)?d=c.auto_join_text_ed:b.text.match(/^(\w*ing) .*/i)?d=c.auto_join_text_ing:d=c.auto_join_text_default);var f=b.from_user||b.user.screen_name,g="http://"+c.twitter_url+"/"+f,h=c.avatar_size,i=b.profile_image_url||b.user.profile_image_url,j="http://"+c.twitter_url+"/"+f+"/statuses/"+b.id_str,k=b.created_at,l=e(k),m=b.text,n=a([m]).linkUrl().linkUser().linkHash()[0],o=c.join_text?'<span class="tweet_join"> '+d+" </span>":" ",p=h?'<a class="tweet_avatar" href="'+g+'"><img src="'+i+'" height="'+h+'" width="'+h+'" alt="'+f+'\'s avatar" title="'+f+'\'s avatar" border="0"/></a>':"",q='<span class="tweet_time"><a href="'+j+'" title="view tweet on twitter">'+l+"</a></span>",r='<span class="tweet_text">'+a([n]).makeHeart().capAwesome().capEpic()[0]+"</span>";return"<li>"+c.template({from_user:f,user_url:g,avatar_size:h,avatar_url:i,tweet_url:j,tweet_time:k,tweet_relative_time:l,tweet_raw_text:m,tweet_text:n,join:o,avatar:p,time:q,text:r})+"</li>"});g.append(f.join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd"),c.outro_text&&g.after(i),a(d).trigger("loaded").trigger(f.length==0?"empty":"full"),c.refresh_interval&&window.setTimeout(function(){a(d).trigger("load")},1e3*c.refresh_interval)})}).trigger("load")})}})(jQuery);
(function($){
    function reflow() {
        var socialTab = $("#social");

        if (this.is(".wide.tall")) {
            if (!socialTab.length) {
                $("#schedule")
                    .after('<div id="social">\
                                <a href="http://twitter.com/FrontEndDay" class="action"><span class="icon twitter"></span>our Twitter feed</a>\
                                <div id="tweets"></div>\
                                <a href="http://www.facebook.com/Telerik?v=info" class="action"><span class="icon facebook"></span>connect with us on Facebook</a>\
                            </div>');

                socialTab = $("#social")

                $("#tweets").tweet({
	                query: "FrontEnd",
	                count: 3,
	                loading_text: "loading tweets...",
                    template: function(info) {
                        return info.text + "<div class='.details'>" + info.time + "</div>";
                    }
                });
            }
            
            socialTab.show();
        } else
            socialTab.hide();
    }

    var $body = $(document.body);

    $(window).resize($.proxy(reflow, $body));

    reflow.call($body);
})(jQuery);