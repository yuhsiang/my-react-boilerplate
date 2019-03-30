# My React Boilerplate

## Login-Flow 
* partially inspired by [login-flow](https://github.com/mxstbr/login-flow)

## Project-Setup
* partially inspired by [react-boilerplate](https://github.com/react-boilerplate/rr
eact-boilerplate)

## Develope Prerequisite
* Docker
* npm/yarn > 8

## Module Info
* React, React-Redux, Immutable, Reselect
* ANTD - UI framework
* styled-components - CSS class

## 開發須知
### 設定環境
1. 新增 .env 到 <PROJECT_FOLDER> 底下 (與 package.json 同一層)
2. 編輯 .env 將以下設定檔貼上
3. 可自行更改 `CORS_DOMAIN` 到你要連的伺服器

```env
PORT=3002 # 你 dev要用的 port
CORS_DOMAIN=https://ptt.cc/.... # 要連到 cors 的網站
```
## Deployment 流程說明
> .gitlab-ci.yml 上有詳細 script，流程簡單描述

```bash
make pull
make run
```
