/* menu-renderer.js
 * Menu Renderer - 動態菜單渲染器
 * Made by Daniel Huang
 * Last update: 1/11/26
 */

class MenuRenderer {
    constructor() {
        this.menuData = null;
    }

    // 載入菜單數據（直接使用全局變量）
    loadMenuData() {
        if (window.MENU_DATA) {
            this.menuData = window.MENU_DATA;
            return Promise.resolve(this.menuData);
        } else {
            console.error('菜單數據未載入，請確保 menu-data.js 已經載入');
            return Promise.reject(new Error('Menu data not loaded'));
        }
    }

    // 渲染單個菜單項目
    renderMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        menuItem.innerHTML = `
            <img src="images/${item.image}" alt="${item.name.en}">
            <div class="menu-item-info">
                <h3>${item.name.en}</h3>
                <p class="chinese-name">${item.name.zh}</p>
                <p class="description">${item.description}</p>
            </div>
        `;

        return menuItem;
    }

    // 渲染完整分類
    async renderCategory(categoryId, containerId = 'menu-section') {
        // 確保數據已載入
        if (!this.menuData) {
            await this.loadMenuData();
        }

        const category = this.menuData.categories[categoryId];
        if (!category) {
            console.error(`找不到分類: ${categoryId}`);
            return;
        }

        // 更新頁面標題
        const titleElement = document.querySelector('.section-title');
        if (titleElement) {
            titleElement.textContent = `${category.title.en} ${category.title.zh}`;
        }

        // 應用佈局樣式
        if (category.layout === 'single-row') {
            document.body.classList.add('single-row-layout');
        } else {
            document.body.classList.remove('single-row-layout');
        }

        // 渲染菜單項目
        const menuItemsContainer = document.querySelector('.menu-items');
        if (!menuItemsContainer) {
            console.error('找不到 .menu-items 容器');
            return;
        }

        // 清空現有內容
        menuItemsContainer.innerHTML = '';

        // 添加所有項目
        category.items.forEach(item => {
            const menuItemElement = this.renderMenuItem(item);
            menuItemsContainer.appendChild(menuItemElement);
        });

        // 添加 "And more..." 提示（如果有）
        if (category.note) {
            const noteElement = document.createElement('div');
            noteElement.className = 'menu-note';
            noteElement.style.cssText = 'text-align: center; padding: 2rem; font-style: italic; color: #666; font-size: 1.1rem;';
            noteElement.textContent = category.note;
            menuItemsContainer.parentElement.appendChild(noteElement);
        }

        // 觸發滾動動畫（重新觀察新添加的元素）
        this.initScrollAnimations();
    }

    // 初始化滾動動畫（與 index.js 中的邏輯相同）
    initScrollAnimations() {
        const menuItems = document.querySelectorAll('.menu-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        menuItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }

    // 根據頁面URL自動渲染對應分類
    async autoRender() {
        const pageName = window.location.pathname.split('/').pop().replace('.html', '');

        // 如果是首頁或其他非菜單頁面，不執行
        const menuPages = ['popular-orders', 'main-dish', 'pop-sides', 'milk-tea',
                          'smoothies', 'refreshers', 'tugo-specials'];

        if (menuPages.includes(pageName)) {
            await this.renderCategory(pageName);
        }
    }
}

// 初始化（DOM載入完成後自動執行）
document.addEventListener('DOMContentLoaded', async () => {
    const renderer = new MenuRenderer();
    try {
        await renderer.autoRender();
    } catch (error) {
        console.error('菜單渲染失敗:', error);
        // 如果載入失敗，保留HTML中的靜態內容作為後備方案
    }
});
