const Renderer = () => {
    
    const render = data => {
        const source = $('#players-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ players: data });

        $('#roster').empty().append(newHTML);
    }

    return { render }
}