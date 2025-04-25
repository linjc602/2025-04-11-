const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 動態生成選單
function createMenu() {
    const menu = document.createElement('ul');
    menu.style.position = 'absolute';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.listStyle = 'none';
    menu.style.margin = '0';
    menu.style.padding = '0';
    menu.style.gap = '30px'; // 選單項目之間的間距
    menu.style.zIndex = '3'; // 最上層

    const subMenuItems = [
        { name: '第一周', url: 'https://linjc602.github.io/2025-02-21/' },
        { name: '第二周', url: 'https://linjc602.github.io/20250307/' },
        { name: '第三周', url: 'https://linnnn602.github.io/20250328-1/' },
        { name: '第四周', url: 'https://linjc602.github.io/2025-04-04/' }
    ];

    const menuItems = [
        { name: '首頁', action: () => hideIframe() },
        { name: '自我介紹', action: () => hideIframe() },
        { name: '作品集', action: () => toggleSubMenu() },
        { name: '測驗卷', action: () => showIframe('https://linjc602.github.io/20250321-/') },
        { name: '教學影片', action: () => showIframe('https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week8/20250411_094048.mp4') }
    ];

    const subMenu = document.createElement('ul');
    subMenu.style.position = 'absolute';
    subMenu.style.top = '50px'; // 子選單顯示在作品集正下方
    subMenu.style.left = '0'; // 與作品集對齊
    subMenu.style.listStyle = 'none';
    subMenu.style.margin = '0';
    subMenu.style.padding = '0';
    subMenu.style.display = 'none'; // 初始隱藏子選單
    subMenu.style.backgroundColor = 'rgba(162, 210, 255, 0.2)';
    subMenu.style.borderRadius = '10px';
    subMenu.style.zIndex = '3';

    subMenuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.style.padding = '10px 15px';
        li.style.cursor = 'pointer';
        li.style.color = 'white';
        li.style.fontFamily = '"微軟正黑體", Arial, sans-serif';
        li.style.fontSize = '20px';
        li.style.borderBottom = '1px solid #a2d2ff';
        li.addEventListener('click', () => showIframe(item.url));
        subMenu.appendChild(li);
    });

    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.style.backgroundColor = 'rgba(162, 210, 255, 0.2)';
        li.style.padding = '10px 15px';
        li.style.height = '50px';
        li.style.lineHeight = '30px';
        li.style.borderRadius = '10px';
        li.style.border = '2px solid #a2d2ff';
        li.style.color = 'white';
        li.style.fontFamily = '"微軟正黑體", Arial, sans-serif';
        li.style.fontSize = '20px';
        li.style.cursor = 'pointer';
        li.style.transition = 'color 0.3s, background-color 0.3s';

        li.addEventListener('mouseover', () => {
            // 如果是「自我介紹」，顯示圖片
            if (item.name === '自我介紹') {
                let img = document.getElementById('introImage');
                if (!img) {
                    img = document.createElement('img');
                    img.src = '自我介紹.png'; // 確保圖片路徑正確
                    img.id = 'introImage';
                    img.style.position = 'fixed';
                    img.style.top = '50%'; // 垂直居中
                    img.style.left = '50%'; // 水平居中
                    img.style.width = '60%'; // 寬度為螢幕的 60%
                    img.style.height = '60%'; // 高度為螢幕的 60%
                    img.style.transform = 'translate(-50%, -50%)'; // 將圖片中心對齊螢幕中心
                    img.style.objectFit = 'cover'; // 確保圖片按比例填滿
                    img.style.zIndex = '5';
                    document.body.appendChild(img);
                }
            }
        });

        li.addEventListener('mouseout', () => {
            // 如果是「自我介紹」，隱藏圖片
            if (item.name === '自我介紹') {
                const img = document.getElementById('introImage');
                if (img) {
                    img.remove();
                }
            }
        });

        li.addEventListener('click', item.action);

        // 如果是作品集，將子選單附加到該項目
        if (item.name === '作品集') {
            li.style.position = 'relative'; // 設定為相對定位，讓子選單定位於該項目下方
            li.appendChild(subMenu);
        }

        menu.appendChild(li);
    });

    document.body.appendChild(menu);

    function toggleSubMenu() {
        subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
    }
}

// 顯示 iframe
function showIframe(url) {
    let iframe = document.getElementById('iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'iframe';
        iframe.style.position = 'fixed'; // 固定位置
        iframe.style.top = '10%'; // 距離螢幕頂部 10%
        iframe.style.left = '10%'; // 距離螢幕左側 10%
        iframe.style.width = '80%'; // 寬度為螢幕的 80%
        iframe.style.height = '80%'; // 高度為螢幕的 80%
        iframe.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 背景透明度 0.5
        iframe.style.border = 'none'; // 無邊框
        iframe.style.zIndex = '2'; // 設置層級
        document.body.appendChild(iframe);
    }
    iframe.src = url; // 設置 iframe 的來源 URL
    iframe.style.display = 'block'; // 顯示 iframe
}

// 隱藏 iframe
function hideIframe() {
    const iframe = document.getElementById('iframe');
    if (iframe) {
        iframe.style.display = 'none'; // 隱藏 iframe
    }
}

// 設定畫布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const numHearts = 40;

// 愛心顏色調色盤
const heartColors = [
    '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', 
    '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', '#FFFFFC'
];

// 初始化愛心的資料
for (let i = 0; i < numHearts; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // 初始位置在畫布上方
        size: Math.random() * 30 + 20, // 大小範圍 20 到 50
        color: heartColors[Math.floor(Math.random() * heartColors.length)], // 隨機選擇顏色
        speed: Math.random() * 2 + 1 // 掉落速度
    });
}

// 繪製愛心
function drawHeart(x, y, size, color) {
    ctx.beginPath();
    ctx.fillStyle = color;

    // 繪製愛心的路徑
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.closePath();
    ctx.fill();
}

// 更新愛心位置並繪製
let textScale = 1; // 文字縮放比例初始值
let scaleDirection = 1; // 控制文字是放大還是縮小

function updateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製背景文字
    ctx.font = `${100 * textScale}px 微軟正黑體`; // 根據縮放比例調整字體大小
    ctx.textAlign = 'center';
    ctx.lineWidth = 5; // 邊框寬度

    // 繪製交叉顏色的文字
    const text = '淡 江 教 育 科 技 學 系'; // 每個字之間加入空格
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') continue; // 跳過空格
        const color = i % 2 === 0 ? '#52b69a' : '#34a0a4'; // 顏色交叉
        ctx.strokeStyle = '#ffffff'; // 邊框顏色
        ctx.fillStyle = color;

        // 計算每個字的位置
        const charX = canvas.width / 2 - (text.length / 2 - i) * 60 * textScale; // 每個字間隔隨縮放比例調整
        const charY = canvas.height / 2;

        // 繪製文字邊框
        ctx.strokeText(char, charX, charY);
        // 填充文字
        ctx.fillText(char, charX, charY);
    }

    // 控制文字縮放比例的變化
    textScale += 0.01 * scaleDirection; // 根據方向調整縮放比例
    if (textScale >= 1.2) {
        scaleDirection = -1; // 當放大到 1.2 倍時，開始縮小
    } else if (textScale <= 1) {
        scaleDirection = 1; // 當縮小到原始大小時，開始放大
    }

    // 繪製愛心
    hearts.forEach(heart => {
        drawHeart(heart.x, heart.y, heart.size, heart.color);
        heart.y += heart.speed; // 愛心向下移動

        // 如果愛心超出畫布底部，重置到畫布上方
        if (heart.y - heart.size > canvas.height) {
            heart.y = -heart.size;
            heart.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(updateHearts);
}

// 畫布大小調整時更新
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 初始繪製
createMenu(); // 動態生成選單
updateHearts(); // 開始動畫