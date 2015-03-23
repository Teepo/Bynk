var Template = {};

Template.LastId = 0;

Template.process = Memoize.process(function(template_path)
                                                {
                                                    var code = [];
                                                    code.push('var id=');
                                                    code.push(Template.LastId);
                                                    code.push(';data.PropertyChanged = function(property){document.getElementById(id+property).innerHTML=data[property]};var buffer = []; buffer.push("');
                                                    //.replace(/<%{Binding:(data\.)?([_a-zA-Z]+[a-zA-Z0-9]*)}%>/g, '");buffer.push("<span id=\"+id+\"$2>" + $1$2 + "</span>");buffer.push("')
                                                    //return new Function("data", code.join('').replace(/buffer.push\("\s*"\);/g, '/*cleaning*/'));
                                                    //var source = document.getElementById(template_path).value;
                                                    //.replace(/(\/?)__TEXTAREA__/g, "$1textarea")
                                                    var source = (typeof(template_path) == "string") ? $(template_path).html() : template_path.html();
                                                    source = source.replace(/(<!\-\-)|(&lt;!\-\-)|(%3C%21\-\-)|(\-\->)|(\-\-&gt;)|(\-\-%3E)/g, '');
                                                    //alert("source -> "  + source );
                                                    //alert("test " + (typeof(template_path) == "string") ? ($(template_path).size() + " - " + template_path) : (template_path.size() + " - " + template_path.selector));
                                                    code.push(source.replace(/[\r\t\n]/g, " ")
                                                              .replace(/"/g, '\\"') // '
                                                              .replace(/<%=(.*?)%>/g, '");buffer.push($1);buffer.push("')
                                                              .replace(/<%(.*?)%>/g, '");$1 buffer.push("'));
                                                    code.push('");return buffer.join("")');
                                                    return new Function("data", code.join(''));
                                                })