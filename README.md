
# <div align="center"> Pr Media Player </div>

- Pr Templates is a simplified, lightweight JavaScript Templating Engine. 
- This templating engine can work in Node Js, with Express JS.

## Homepage 
[phillip-rek.github.io](https://Phillip-Rek.github.io/)

## Repository
[github.com/Phillip-Rek/perthite](https://github.com/Phillip-Rek/pr-templates)

##  Usage Example 

```
{% template navBar(pages) %}
    <nav>
        {% for(let page of pages) %}
            <a href="${page.url}">{{ page.name }}</a>
        {% end_for %} 
    </nav>
{% end_template %}

{% call: navBar([{ name: "Home", url: "/" }, { name: "About", url: "about" }]) %}
```

## Installing 

```npm i perthite-2```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020 Phillip Rekhotho


