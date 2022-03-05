import { textNode, markup } from '../../../node_modules/slingjs/sling.min';

class TodoHeaderComponent {

    constructor() {
    }

    slStyle() {
        return 'div h4 { text-align: center; padding: 1rem; font-family: Arial; line-height: 58px; font-size: 54px; font-weight: 300; }'
    }
    view() {
        return markup('div', {
            attrs: {
                id: 'divTodoHeader'
            },
            children: [
                markup('h4', {
                    children: [
                        textNode('Todo App')
                    ]
                })
            ]
        });
    }
}

export default TodoHeaderComponent;
