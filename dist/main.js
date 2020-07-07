const renderer = Renderer();

$('#search').click(() => {
    const teamName = $('#team-input').val();

    $.ajax({
        method: 'GET',
        url: `/teams/${teamName.toLowerCase()}`,
        success: data => { renderer.render(data) }
    })

})

$('#roster').on('error', 'img', event => { 
    $(event.currentTarget).attr('src', 'https://pbs.twimg.com/profile_images/3312772829/fe74ab341c1522700845ce9d1263d3fb_400x400.png') 
});