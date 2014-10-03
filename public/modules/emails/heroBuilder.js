'use strict';

var HeroBuilder = function() {
    return {
        img_host: 'http://www.attask.com/uploads/images/',
        singletontags: ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'], //Define which tags are singleton tags
        renderContainers: function(containers) {
            var html = '';

            for(var i = 0; i < containers.length; ++i) {
                html = html + this.openTag(containers[i]);

                if(containers[i].containers) {
                    html = html+this.renderContainers(containers[i].containers); //Recurse if more containers.
                }
                //Do some recursion for other containers and elements
                if(containers[i].elements) {
                    html = html + this.renderElements(containers[i].elements);
                }

                html = html + this.closingTag(containers[i]);
            }

            return html;
        },
        renderElements: function(elements) {
            for(var i = 0; i < elements.length; ++i) {
                var method = 'render'+this.ucfirst(elements[i].type);
                return this[method].apply(this, [elements[i]]);
            }
        },
        openTag: function(container) {
            var ret = '<' + container.tag;

            if(container.attrs) {
                var attrs = container.attrs;
                //attrs.id = (attrs.id) ? attrs.id+'-'+container._id : container.slug+'-'+container._id; //will need a unique identifier for each open tag element.
                for(var k in attrs) {
                    ret = ret + this.attr(k, attrs[k]);
                }
            }

            if(this.singletontags.indexOf(container.tag) !== '-1') {
                ret = ret + ' />';
            } else {
                ret = ret + '>';
            }

            return ret;

        },
        closingTag: function(container) {
            if(this.singletontags.indexOf(container.tag) !== '-1') {
                return '';
            }

            return '</' + container.tag + '>';
        },
        attr: function(name, value) {
            var ret = ' ' + name + '="';
            if(Array.isArray(value)) {
                for(var i = 0; i < value.length; ++i) {
                    ret = ret + value[i];
                    if(i !== value.length - 1) {
                        ret = ret + ' ';
                    }
                }
            } else {
                ret = ret + value;
            }
            ret = ret + '"';
            return ret;
        },
        ucfirst: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        renderBanner: function(element) {
            var html = '';
            element.tag = (element.tag) ? element.tag : 'div';

            var style = '';
            if(element.attrs && element.attrs.style) {
                style = element.attrs.style;
            }

            if(element.background_color) {
                style = style+'background-color:'+element.background_color+';';
            }
            if(element.background_img) {
                var url = (element.background_img.indexOf('http') > -1) ? element.background_img : this.img_host+element.background_img;
                style = style+'background:url('+url+') 0 0 no-repeat;display:block;';
            }

            element.attrs = {
                style: style
            };

            html = html + this.openTag(element);

            if(element.title) {
                html = html+'<h1>'+element.title+'</h1>';
            }

            if(element.subtitle) {
                html = html+'<h3>'+element.subtitle+'</h3>';
            }

            html = html+this.closingTag(element);

            return html;
        },
        renderTitle: function(element) {
            element.tag = (element.tag) ? element.tag : 'h1';
            return this.openTag(element)+element.name+this.closingTag(element);
        },
        renderParagraph: function(element) {
            element.tag = (element.tag) ? element.tag : 'p';
            return this.openTag(element)+element.value+this.closingTag(element);
        },
        renderImage: function(element) {
            element.tag = (element.tag) ? element.tag : 'img';
            return this.openTag(element);
        }
    };
};

