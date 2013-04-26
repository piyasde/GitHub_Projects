// Models
window.Wine = Backbone.Model.extend({
    urlRoot:"http://localhost:8080/brandserver/rest/wines",
    defaults:{
        "id":null,
        "name":"",
        "grapes":"",
        "country":"USA",
        "region":"California",
        "year":"",
        "description":"",
        "picture":""
    }
});

window.WineCollection = Backbone.Collection.extend({
    model:Wine,
    url:"http://localhost:8080/brandserver/rest/wines"
});


// Views
window.WineListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (wine) {
            $(self.el).append(new WineListItemView({model:wine}).render().el);
        });
    },

    render:function (eventName) {
        _.each(this.model.models, function (wines) {
        	console.log(wines.attributes.wine);
        	_.each(wines.attributes.wine, function (win) {
        		$(this.el).append(new WineListItemView({model:win}).render().el);
        	}, this);	
        }, this);
        return this;
    }

});

window.WineListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-wine-list-item').html()),
    
    initialize:function () {
    	if(typeof this.model.attributes != 'undefined')
    		{
		        this.model.bind("change", this.render, this);
		        this.model.bind("destroy", this.close, this);
    		}
    },

    render:function (eventName) {
    	$(this.el).html(this.template(this.model));
        return this;
    },
    
    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }

});

window.WineView = Backbone.View.extend({

    template:_.template($('#tpl-wine-details').html()),

    initialize:function () {
    	console.log(this.model);
    	if(typeof this.model.attributes != 'undefined')
    		this.model.bind("change", this.render, this);
    },

    
    render:function (eventName) {
    	//console.log(this.wine);
    	console.log(this.model);
    	if(typeof this.model.attributes != 'undefined')
    		$(this.el).html(this.template(this.model.attributes));
    	else
    		$(this.el).html(this.template(this.model));
        return this;
    },
    
    events:{
        "change input":"change",
        "click .save":"saveWine",
        "click .delete":"deleteWine"
    },
    
    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
    },
    
    saveWine:function () {
    	
    	
    		console.log(typeof this.model == 'Wine');
    			var win = new Wine(this.model);
    			
    			win.set({
		            name:$('#name').val(),
		            grapes:$('#grapes').val(),
		            country:$('#country').val(),
		            region:$('#region').val(),
		            year:$('#year').val(),
		            description:$('#description').val()
		        });
		        if (win.isNew()) {
		        	if(typeof win.name == 'undefined')
		        	{
		        		console.log('it is undefined');
		        		win = new Wine( {id:null,name:"NEW OBJECT",grapes:"",country:"",region:"",year:"",description:"", picture:"generic.jpg" });
		        		win.set({
				            name:$('#name').val(),
				            grapes:$('#grapes').val(),
				            country:$('#country').val(),
				            region:$('#region').val(),
				            year:$('#year').val(),
				            description:$('#description').val()
				        });
		        		
		        	}
		            var self = this;
		            
		            app.wineList.create(win, {
		                success:function () {
		                	alert('Wine saved successfully');
		                	app.navigate('', true);
		                    window.history.back();
		                    
		                }
		            });
		        } else {
		        	win.save();
		        	alert('Wine updated successfully');
		        	app.navigate('', true);
                	window.history.back();
		        }
    		
    	
        return false;
    },
    
    deleteWine:function () {
    	console.log(this.model);
    	var win = new Wine(this.model);
    	win.destroy({
            success:function () {
                alert('Wine deleted successfully');
                app.navigate('', true);
                //window.history.back();
            }
        });
        return false;
    },
    
    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }

});
window.HeaderView = Backbone.View.extend({

    template:_.template($('#tpl-header').html()),

    initialize:function () {
        this.render();
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "click .new":"newWine"
    },

    newWine:function (event) {
        app.navigate("wines/new", true);
        return false;
    }
});

// Router
var AppRouter = Backbone.Router.extend({

	initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },
    
    routes:{
        "":"list",
        "wines/new":"newWine",
        "wines/:id":"wineDetails"
    },

    list:function () {
        this.wineList = new WineCollection();
        this.wineListView = new WineListView({model:this.wineList});
        this.wineList.fetch();
        $('#sidebar').html(this.wineListView.render().el);
    },

    wineDetails:function (id) {
    	console.log('detalsview');
    	_.each(this.wineList.models, function (wines) {
    		_.each(wines.attributes.wine, function (win) {
    			//console.log(win.id);
    			if(win.id == id)
    				{
    					this.wine = win;
    					//console.log('new place-->>'+this.wine);
    					this.wineView = new WineView({model:this.wine});
    			        $('#content').html(this.wineView.render().el);
    					
    				}
    		});
    	});
    },
    newWine:function () {
        if (app.wineView) app.wineView.close();
        
        app.wineView = new WineView({model:new Wine( {id:null,name:"",grapes:"",country:"",region:"",year:"",description:"", picture:"generic.jpg" })});
        $('#content').html(app.wineView.render().el);
    }
});




var app = new AppRouter();
Backbone.history.start();