import { markup, textNode, version } from '../../../node_modules/slingjs/sling.min';

class NavbarComponent {

    constructor() {
    }

    slStyle() {
        return 'nav span span { margin-left: 0.25rem; }';
    }

    view() {
        return markup('nav', {
            attrs: {
                id: 'divNavbar'
            },
            children: [
                markup('span', {
                    attrs: {
                        style: 'display: flex;'
                    },
                    children: [
                        markup('img', {
                            attrs: {
                                src: 'images/sling.png',
                                width: '30px',
                                height: '30px',
                            }
                        }),
                        markup('span', {
                            attrs: {
                                style: 'align-self: center;'
                            },
                            children: [
                                textNode('Sling')
                            ]
                        }),
                        markup('span', {
                            attrs: {
                                style: 'align-self: center;'
                            },
                            children: [
                                textNode('v' + version())
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default NavbarComponent;
