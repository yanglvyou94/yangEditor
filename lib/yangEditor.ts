// 指令数组
const actions = [
	{
		command: 'formatblock',
		values: [
			{ text: '- 设置标题大小 -', value: 'selected' },
			{ text: 'H1标题', value: 'h1' },
			{ text: 'H2标题', value: 'h2' },
			{ text: 'H3标题', value: 'h3' },
			{ text: 'H4标题', value: 'h4' },
			{ text: 'H5标题', value: 'h5' },
		],
	},
	{
		command: 'forecolor',
		values: [
			{ text: '- 设置字体颜色 -', value: 'selected' },
			{ text: '红色', value: 'red' },
			{ text: '蓝色', value: 'blue' },
			{ text: '绿色', value: 'green' },
			{ text: '黑色', value: 'black' },
		],
	},
	{
		command: 'bold',
		values: [
			{ text: '- 设置字体粗体 -', value: 'selected' },
			{ text: '粗体', value: '' },
		],
	},
];

type valuesItem = {
	text: string;
	value: string;
};

interface ActionsItem {
	command: string;
	values: valuesItem[];
}

export default class YangEditor {
	constructor(dom: string) {
		if (!dom) {
			throw new Error('请传入DOM节点！！！');
		}
		let editWrapper: HTMLElement = document.getElementById(dom);

		let miniEdit: HTMLElement = this.createDOM('div', 'yangEdit');

		let editHeader: HTMLElement = this.createDOM('div', 'yangEditHeader');
		let p = this.createDOM('p');
		p.textContent = 'Hello word';
		actions.forEach((commandItem: ActionsItem) => {
			const selectDOM = this.createSelectDOM(commandItem);
			editHeader.appendChild(selectDOM);
		});

		let editContent = this.createDOM('div', 'yangEditContent');
		// 设置可编辑区域
		editContent.contentEditable = 'true';
		editContent.appendChild(p);
        // 指令区域
		miniEdit.appendChild(editHeader);
        // 可编辑区域
		miniEdit.appendChild(editContent);
		editWrapper.appendChild(miniEdit);
	}

	// 创建select节点
	private createSelectDOM(commandItem: ActionsItem): HTMLSelectElement {
		let select = document.createElement('select');
		commandItem.values.forEach((item) => {
			select.add(new Option(item.text, item.value));
			select.id = `${commandItem.command}`;
		});
		// select标签onchange事件
		select.onchange = () => {
			this.execCommand(commandItem.command, select.options[select.selectedIndex].value);
		};
		return select;
	}

	private execCommand(cmd: string, value: string): void {
		//execCommand bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
		// aCommandName 一个 DOMString ，命令的名称。
		//aShowDefaultUI 一个 Boolean， 是否展示用户界面，一般为 false
		//aValueArgument 一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。
		document.execCommand(cmd, false, value);
	}

	// 创建DOM节点
	private createDOM(type: string, className?: string): HTMLElement {
		let dom = document.createElement(type);
		dom.className = className || '';
		return dom;
	}
}
