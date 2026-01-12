/**
 * Dynamic Favicon System for Pedro Marconato CV
 * Automatically sets company-specific favicons based on page URL
 *
 * Performance optimizations:
 * - Debounced input handler (300ms)
 * - Cached favicon state to avoid redundant DOM operations
 * - Efficient company matching
 */

window.DynamicFavicon = (function() {

    // Cache for current favicon state
    let cachedCompany = null;
    let debounceTimer = null;

    // Debounce utility function
    function debounce(func, wait) {
        return function executedFunction(...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Company favicon mappings
    const FAVICONS = {
        'allos': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEyOSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTAwIDEyOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxwYXRoIGQ9Im0wIDEyNy41OWM2LjUwNzctMjUuMjkzIDI5LjQ2MS00NC4wMTUgNTYuODA2LTQ0LjAxNSAyMi4wMjQgMCAzNS44MDggMTIuMTgyIDM1LjgwOCAxMi4xODJzLTguODE1OC0xMC42NzUtMjIuMDg4LTE3LjExOWwtMTMuNTkyLTUyLjA2MS0xMy4zMDQgNTAuNzc5Yy0xMy40NjQgMS44MjczLTI1LjE5NyA3LjY2MTctMzIuNjAyIDEzLjgxN2wyNC4xMDctNzkuMDIyYzEuOTU1NS02LjM3OTQgNy44MjItMTAuNzM5IDE0LjQ5LTEwLjczOWgxNC4yOThjNi42NjggMCAxMi41NjcgNC4zNTk4IDE0LjQ5IDEwLjczOWwzMy41IDExMC4wMmMwLjY0MTIgMS43NjMyIDEuMjE4MiAzLjU5MDQgMS42OTkxIDUuNDQ5OGgtMzAuMzI2bC0wLjA2NC0wLjIyNDRjLTUuMTkzMy05LjIzMjUtMTUuMDk5LTE1LjQ1Mi0yNi40MTUtMTUuNDUycy0yMC45OTggNi4wOTA5LTI2LjI1NSAxNS4xMzFsLTAuMTI4MiAwLjU0NDk3aC0zMC40MjN6bTQ2My4xIDBoLTQ2Ljc3MnYtMjYuMzUxaDQ1LjUyMmM2LjUwNzcgMCAxMS43OTctNC4wMzkyIDExLjc5Ny0xMC41MTUgMC02LjA5MDktOS42NDkzLTkuOTA1OC0yMS44NjMtMTMuNTkyLTkuMzkyOC0yLjgyMS0zNC4zMzQtMTAuMzIyLTM0LjMzNC0zNy41NzEgMC0yMS4wMyAxNS40Mi0zOC4xNDggMzguMTQ4LTM4LjE0OGgzOS4zMDJsLTYuODkyNCAyNi4zNTFoLTMyLjQxYy02LjUwNzYgMC0xMS43OTcgNC4wMzkyLTExLjc5NyAxMC41MTUgMCA2LjA5MDkgMy4zNjYgOS45MDU4IDE1LjU4IDEzLjU5MiA5LjM5MjggMi44MjEgNDAuNjE3IDEwLjMyMiA0MC42MTcgMzcuNTcxIDAgMjIuNjk3LTE1LjgzNiAzOC4xNDgtMzYuODY2IDM4LjE0OG0tMzEyLjY2IDBjLTcuMTQ4OSAwLTEzLjA0Ny0xLjA5LTE3LjY5Ni0zLjIzNzgtNC42NDgzLTIuMTQ3OC04LjExMDUtNS41NDU5LTEwLjM4Ny0xMC4xOTQtMi4yNzYtNC42NDgzLTMuMzk4MS0xMC42NDMtMy4zOTgxLTE4LjAxNnYtOTQuNzNoMjkuNDI5djg5Ljc5M2MwIDIuMzcyMiAwLjM1MjYgNC4yOTU3IDEuMDg5OSA1Ljc3MDMgMC43Mzc0IDEuNDc0NiAxLjg1OTQgMi41NjQ2IDMuMzk4MSAzLjIzNzggMS41Mzg4IDAuNjczMiAzLjMwMTkgMS4wMjU4IDUuMzUzNiAxLjAyNThoMzguMjc3djI2LjM1MWgtNDYuMDk5em0yNDIuMzItMTA4LjQyYy0yNS4wMzctMjUuMDM3LTY1LjYyMi0yNS4wMzctOTAuNjU4IDAtMjUuMDM3IDI1LjAzNy0yNS4wMzcgNjUuNjIyIDAgOTAuNjU4IDI1LjAzNyAyNS4wMzcgNjUuNjIyIDI1LjAzNyA5MC42NTggMHMyNS4wMzctNjUuNjIyIDAtOTAuNjU4bS0xOC45MTQgNzEuNzc3Yy0xNC41ODYgMTQuNTg2LTM4LjI3NyAxNC41ODYtNTIuODYzIDAtMTQuNTg2LTE0LjU4Ni0xNC41ODYtMzguMjc3IDAtNTIuODYzIDE0LjU4Ni0xNC41ODYgMzguMjc3LTE0LjU4NiA1Mi44NjMgMHMxNC41ODYgMzguMjc3IDAgNTIuODYzbS0xMzYuMzcgMzYuNjQyYy03LjE0ODggMC0xMy4wNDctMS4wOS0xNy42OTYtMy4yMzc4cy04LjExMDUtNS41NDU5LTEwLjM4Ny0xMC4xOTRjLTIuMjc2MS00LjY0ODMtMy4zOTgxLTEwLjY0My0zLjM5ODEtMTguMDE2di05NC43M2gyOS40Mjl2ODkuNzkzYzAgMi4zNzIyIDAuMzUyNyA0LjI5NTcgMS4wOSA1Ljc3MDMgMC43MzczIDEuNDc0NiAxLjg1OTMgMi41NjQ2IDMuMzk4MSAzLjIzNzggMS41Mzg3IDAuNjczMiAzLjMwMTkgMS4wMjU4IDUuMzUzNiAxLjAyNThoMzguMjc3djI2LjM1MWgtNDYuMDk5eiIgZmlsbD0iIzAwNjg3NyIvPgo8L3N2Zz4=',
            name: 'Allos',
            color: '#006877'
        },
        'boticario': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NTY1LjMxIDE0NDMuNzkiPjxkZWZzPjxzdHlsZT4uZmlsNntmaWxsOiMwMDFkM2E7ZmlsbC1ydWxlOm5vbnplcm99LmZpbDB7ZmlsbDojMDA3NWIxO2ZpbGwtcnVsZTpub256ZXJvfS5maWw0e2ZpbGw6IzAwOWNkYjtmaWxsLXJ1bGU6bm9uemVyb30uZmlsMXtmaWxsOiM3YmMyMjQ7ZmlsbC1ydWxlOm5vbnplcm99LmZpbDJ7ZmlsbDojZDNkYTAwO2ZpbGwtcnVsZTpub256ZXJvfS5maWwze2ZpbGw6I2ZmNGQxMTtmaWxsLXJ1bGU6bm9uemVyb30uZmlsNXtmaWxsOiNmZjdhMDA7ZmlsbC1ydWxlOm5vbnplcm99PC9zdHlsZT48L2RlZnM+PC9zdmc+',
            name: 'Grupo Boticário',
            color: '#7BC224'
        },
        'sicredi': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibG9nby1kZXNrIGxvZ28tc2ljcmVkaSBndGFnLWNsaWNrLXRyaWdnZXIiIGRhdGEtZ3RhZy1hY3Rpb249ImxvZ28iIGRhdGEtZ3RhZy1sYWJlbD0ibG9nbyIgdmlld0JveD0iMCAwIDE0NSAzNCIgd2lkdGg9IjE0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1LjE5NjUgMTUuMjQ4NkMyNC4yMDM1IDE2LjA2NjQgMjMuNDYzNiAxNi4yMDI3IDIzLjEzMjYgMTUuODcxN0MyMi45MTg1IDE1LjY1NzUgMjIuODc5NSAxNS4yMjkyIDIzLjAzNTMgMTQuNjg0QzIzLjU2MSAxMi45NTExIDIzLjk2OTggMTEuMTk4OCAyNC4zMDA4IDkuNDI3MDJDMjYuMjg2OCA4LjU1MDg2IDI4LjI3MjggNy43MzMxMSAzMC40NzI5IDcuNTE4OTRDMjkuNDQxIDEwLjM0MjEgMjcuNTUyNCAxMy4yODIxIDI1LjE5NjUgMTUuMjQ4NlpNMjQuMTg0IDIxLjA3MDJDMjIuOTM3OSAyMC44MTcxIDIyLjM1MzggMjAuMjcyIDIyLjM5MjggMTkuNzg1MkMyMi40MTIyIDE5LjQ3MzcgMjIuNzA0MyAxOS4xNjIyIDIzLjIxMDUgMTguOTQ4QzI0Ljc2ODEgMTguMjg2IDI2LjMwNjMgMTcuNTY1NiAyNy43NjY1IDE2LjY4OTRDMjkuNjk0MSAxNy42MjQgMzEuNTQzOCAxOC44MTE3IDMzLjAyMzUgMjAuMzEwOUMzMC4zMTcyIDIxLjMyMzQgMjYuOTg3NyAyMS42NTQ0IDI0LjE4NCAyMS4wNzAyWk0xOS4wNDM5IDI0LjE0NjVDMTguNDQwMyAyMi45MDA0IDE4LjQ5ODcgMjIuMDQzOCAxOC44ODgxIDIxLjc1MTdDMTkuMTYwNyAyMS41NTcgMTkuNTg5IDIxLjU5NTkgMjAuMDc1OCAyMS44Njg1QzIxLjU5NDUgMjIuNzI1MiAyMy4xMzI2IDIzLjUwNCAyNC43NjgxIDI0LjE0NjVDMjQuNzY4MSAyNC4xNDY1IDI0Ljc2ODEgMjQuMTQ2NSAyNC43NjgxIDI0LjE2NkMyNS4zNTIyIDI2LjUwMjQgMjUuNzAyNyAyOC45NTU3IDI1LjU0NjkgMzEuMzdDMjIuODQwNiAyOS42NTY2IDIwLjM4NzMgMjYuOTMwOCAxOS4wNDM5IDI0LjE0NjVaTTEzLjIyMjMgMjEuOTA3NUMxMy45MDM3IDIwLjU0NDUgMTQuNjI0MSAyMC4wMTg4IDE1LjExMDkgMjAuMTc0NkMxNS40NDE5IDIwLjI3MiAxNS42NzU1IDIwLjY0MTkgMTUuNzUzNCAyMS4yNDU1QzE2LjAyNiAyMy4xNTM2IDE2LjQzNDkgMjUuMDIyNyAxNi45MjE2IDI2Ljg3MjRDMTUuMjI3NyAyOS4xNTA0IDEzLjQxNyAzMS4zNTA1IDExLjEzODkgMzMuMTQxOEMxMC44ODU4IDI5LjQ2MTkgMTEuNTg2OCAyNS4yMzY5IDEzLjIyMjMgMjEuOTA3NVpNMTEuNDY5OSAxNS42MTg2QzEzLjAwODEgMTUuMzA3IDEzLjg0NTMgMTUuNTYwMiAxNC4wNCAxNi4wNDY5QzE0LjE1NjggMTYuMzU4NCAxNC4wMDExIDE2Ljc4NjggMTMuNTcyNyAxNy4yNTQxQzEyLjEzMTkgMTguNzUzMyAxMC44MDc5IDIwLjMzMDQgOS41NDIzOCAyMS45NjU5SDkuNTIyOTFDNi40MjcxNCAyMi4xOCAzLjE5NTA4IDIyLjA2MzIgMC4xNTc3MTUgMjEuMzQyOEMzLjI1MzQ5IDE4LjczMzggNy40Mzk1OSAxNi40MTY4IDExLjQ2OTkgMTUuNjE4NlpNMTUuNDAyOSAxMC41MTc0QzE2LjU1MTcgMTEuNTEwMyAxNi44NjMyIDEyLjI4OTIgMTYuNjEwMSAxMi43MTc1QzE2LjQzNDkgMTIuOTkwMSAxNi4wMjYgMTMuMTI2NCAxNS40MDI5IDEzLjA2OEMxMy4zMzkxIDEyLjgzNDMgMTEuMjc1MiAxMi43MzcgOS4xOTE5MiAxMi43MzdDNy4yMjU0MiAxMC40Nzg0IDUuNDM0MTYgNy45NjY3NiA0LjI4NTQxIDUuMjYwMzlDOC4xOTg5MyA2LjEzNjU1IDEyLjQwNDUgNy45NjY3NiAxNS40MDI5IDEwLjUxNzRaTTIxLjUxNjYgMTAuNTk1MkMyMS41MTY2IDExLjk5NzEgMjEuMTI3MiAxMi42OTggMjAuNjU5OSAxMi43MzdDMjAuMzQ4NCAxMi43NzU5IDE5Ljk5NzkgMTIuNTIyOCAxOS42NjY5IDEyLjAxNjZDMTguNjE1NSAxMC4zODExIDE3LjQ2NjggOC44MDM5OCAxNi4yNDAyIDcuMjY1ODNDMTYuNzA3NCA0LjgxMjU3IDE3LjQ2NjggMi4zMjAzOCAxOC43NzEzIDAuMTU5MThDMjAuNDA2OCAzLjI5Mzg5IDIxLjUzNjEgNy4xMTAwNiAyMS41MTY2IDEwLjU5NTJaIj48L3BhdGg+CjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjIzOSA3LjI0NjYxQzE2LjcwNjMgNC44MTI4MyAxNy40NjU2IDIuMzIwNjQgMTguNzcwMSAwLjE1OTQzOUMxNS45ODU5IC0wLjIyOTk2NiAxMy4xMjM3IDAuMTAxMDI4IDEwLjUxNDcgMS4wNzQ1NEMxMi4xMTEzIDIuNjMyMTYgMTMuNjg4NCA0LjIwOTI1IDE1LjEwOTcgNS45MDMxN0MxNS4yNzU3IDYuMTA0MDYgMTUuNDUzNCA2LjMxMjc5IDE1LjYyODggNi41MTg4MUMxNS44NDQ0IDYuNzcyMDQgMTYuMDU2NSA3LjAyMTE2IDE2LjIzOSA3LjI0NjYxWk0yNS4wNTk0IDIuMzYwMjhDMjQuOTQyNiA0LjIyOTQyIDI0LjgwNjMgNi4wNzkxIDI0LjUzMzcgNy45MDkzQzI0LjUwMTMgOC4xMTIxMiAyNC40Njg4IDguMzMxODMgMjQuNDM2NCA4LjU1MTU1QzI0LjM5MDkgOC44NTkxNSAyNC4zNDU1IDkuMTY2NzYgMjQuMzAwMSA5LjQyNzk4QzI2LjI4NiA4LjU1MTgyIDI4LjI3MiA3LjczNDA3IDMwLjQ3MjEgNy41MTk5QzI5LjA4OTggNS40MzY1OCAyNy4yNDAxIDMuNjY0NzkgMjUuMDU5NCAyLjM2MDI4Wk0zMi45MDQ5IDEzLjE0NjJDMzEuNjM5MyAxNC4xMzkyIDMwLjMzNDggMTUuMTEyNyAyOC45NTI0IDE1Ljk0OTlDMjguNzc2MiAxNi4wNTU2IDI4LjU5MjEgMTYuMTczMyAyOC40MDg5IDE2LjI5MDNMMjguNDA4OCAxNi4yOTA0QzI4LjE4NzMgMTYuNDMxOSAyNy45NjczIDE2LjU3MjUgMjcuNzY0NyAxNi42ODk4QzI5LjY5MjMgMTcuNjI0MyAzMS41NDIgMTguODEyIDMzLjAyMTcgMjAuMzExMkMzMy4zNzIyIDE3LjgzODUgMzMuMzUyNyAxNS42MTg5IDMyLjkwNDkgMTMuMTQ2MlpNMjYuMTA4MyAyNC42NTI3QzI3LjYyNyAyNS4yMTc0IDI5LjIwNDEgMjUuNjQ1NyAzMC43ODExIDI2LjAzNTFDMjkuNDc2NiAyOC4xMzc5IDI3LjY4NTQgMjkuOTg3NiAyNS41NjMxIDMxLjM3QzI1LjcxODkgMjguOTU1NyAyNS4zNjg0IDI2LjUwMjQgMjQuNzg0MyAyNC4xNjZWMjQuMTQ2NUMyNS4xMDc2IDI0LjI5MiAyNS41MTE1IDI0LjQzNzUgMjUuODg0NSAyNC41NzE5TDI1Ljg4NDcgMjQuNTcyTDI1Ljg4NDggMjQuNTcyQzI1Ljk2MDkgMjQuNTk5NCAyNi4wMzU3IDI0LjYyNjMgMjYuMTA4MyAyNC42NTI3Wk0xOS4zOTIyIDMzLjc2NDZDMTguNjUyNCAzMS45OTI4IDE3Ljk1MTQgMzAuMjAxNSAxNy4zODY4IDI4LjQxMDNDMTcuMzQ2NCAyOC4yNzg5IDE3LjMwMzQgMjguMTQyNCAxNy4yNTk3IDI4LjAwMzlMMTcuMjU5NyAyOC4wMDM2TDE3LjI1OTYgMjguMDAzNUwxNy4yNTk2IDI4LjAwMzRMMTcuMjU5NiAyOC4wMDM0QzE3LjEzNTEgMjcuNjA4NSAxNy4wMDYgMjcuMTk4NiAxNi45MTk1IDI2Ljg1MjdDMTUuMjI1NiAyOS4xMzA3IDEzLjQxNDkgMzEuMzMwOCAxMS4xNTYzIDMzLjEyMjFDMTMuODgyMiAzMy45MjA0IDE2LjU0OTYgMzQuMjcwOCAxOS4zOTIyIDMzLjc2NDZaTTguNDcxNTIgMjMuNDY1OEM3LjE0NzU0IDI1LjMxNTQgNS45NDAzOSAyNy4zMDE0IDQuNzkxNjQgMjkuMjg3NEMyLjUzMzA5IDI3LjA4NzIgMC45MzY1MzEgMjQuMzIyNCAwLjE1NzcyMSAyMS4zNDM1QzMuMTk1MDggMjIuMDYzOSA2LjQyNzE0IDIyLjE4MDcgOS41MjI5MiAyMS45NjY1SDkuNTQyMzlDOS4zNDM3OSAyMi4yMzUyIDkuMTI0MTYgMjIuNTQ2IDguOTA0NTQgMjIuODU2N0w4LjkwNDM4IDIyLjg1N0w4LjkwNDE5IDIyLjg1NzJDOC43NTc4OSAyMy4wNjQyIDguNjExNiAyMy4yNzEyIDguNDcxNTIgMjMuNDY1OFpNMCAxMy4zOTg3QzIuNDMzNzggMTMuMTA2NiA0Ljg4NzA0IDEyLjg1MzUgNy4zMDEzNSAxMi43NzU2QzcuNTA1NjQgMTIuNzY5MyA3LjcyMDM5IDEyLjc2MDggNy45MzYwMSAxMi43NTIzTDcuOTM2MTYgMTIuNzUyM0M4LjM3ODA4IDEyLjczNDggOC44MjM1OSAxMi43MTcyIDkuMTg5OTYgMTIuNzE3MkM3LjIwNCAxMC40NzgyIDUuNDMyMiA3Ljk2NjQ5IDQuMjgzNDYgNS4yNjAxM0MyLjEyMjI2IDcuNTM4MTUgMC42NDI1MTkgMTAuMzgwOCAwIDEzLjM5ODdaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD4KPHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDIuNTQyOSAxMS4yOTQ4QzQyLjA5NTEgMTQuNjA0OCA0My4zMDIzIDE2LjU3MTMgNDYuNjEyMiAxNy44NTYzTDUwLjk3MzUgMTkuNTExM0M1Mi4zNTU5IDE5Ljk5OCA1Mi42Njc1IDIwLjIzMTcgNTIuNDkyMiAyMS41NTU3QzUyLjIxOTYgMjMuMjQ5NiA1MS41MzgyIDIzLjY5NzQgNDguNDgxMyAyMy42OTc0SDQxLjA4MjZMNDAuNDIwNyAyOC4xMTcxSDQ4LjY5NTVDNTUuMTQwMiAyOC4xMTcxIDU3LjMyMDkgMjYuNjc2MyA1Ny45NjM0IDIxLjkwNjFDNTguMzcyMiAxOC45MDc3IDU3LjgyNzEgMTYuNzQ2NSA1My44NTUxIDE1LjI4NjJMNDkuNzI3NCAxMy43Njc1QzQ4LjEzMDkgMTMuMjAyOSA0Ny44Mzg4IDEyLjk2OTMgNDguMDUzIDExLjY0NTNDNDguMjg2NiAxMC4xNjU1IDQ4Ljg3MDggOS44MzQ1NSA1MC4wNTg0IDkuNzU2NjdINTguODk3OUw1OS41NTk5IDUuMzM2OTFINTEuNjc0NUM0Ni4zMDA3IDUuMzM2OTEgNDMuMjYzMyA2LjI5MDk2IDQyLjU0MjkgMTEuMjk0OFpNNjcuNjU5NSA5Ljc1NjY3TDY4LjMwMjEgNS4zMzY5MUg2Mi45NDc3TDYyLjI4NTcgOS43NTY2N0g2Ny42NTk1Wk02NC45NTMzIDI4LjA5NzZINTkuNTk4OUw2MS45NTQ4IDEyLjAxNTFINjcuMzI4Nkw2NC45NTMzIDI4LjA5NzZaTTc4LjE1NTIgMTEuNTY4M0M3NS4xMTc4IDExLjU2ODMgNzMuMDE1IDEyLjE3MTggNzEuNTkzNyAxMy40NzY0QzcwLjE3MjQgMTQuNzYxNCA2OS4zNTQ2IDE2LjcwODQgNjguODg3MyAxOS44MjM3QzY4LjQyIDIyLjkxOTQgNjguODA5NSAyNS4xMDAxIDcwLjA5NDUgMjYuNDgyNUM3MS4zMjExIDI3LjgyNiA3My4zODUgMjguNDY4NSA3Ni40NDE4IDI4LjQ2ODVDNzcuOTQxIDI4LjQ2ODUgODAuMTQxMSAyOC4zMzIyIDgyLjEwNzYgMjcuNzA5MUw4Mi4yNDM5IDI3LjY3MDJMODIuODA4NiAyMy44NzM1TDgyLjQ1ODEgMjMuOTMxOUM4MS4wNzU3IDI0LjEyNjYgNzkuMzQyOSAyNC4yMDQ1IDc3LjI5ODUgMjQuMjA0NUM3NS44OTY2IDI0LjIwNDUgNzUuMTc2MiAyNC4wNDg3IDc0Ljc4NjggMjMuNjIwNEM3NC4zMDAxIDIzLjA5NDcgNzQuMjAyNyAyMi4wNjI3IDc0LjQ3NTMgMjAuMDc2OEM3NC45NDI2IDE2LjM5NjkgNzYuMTQ5NyAxNS44MTI4IDc4LjgzNjYgMTUuODEyOEM3OS45MjcgMTUuODEyOCA4My45OTYzIDE1Ljg3MTIgODMuOTk2MyAxNS44NzEyTDg0LjUyMiAxMi4yNjkyQzg0LjUxOTMgMTIuMjcxOCA4NC40NzU5IDEyLjI2MTEgODQuMzkyOCAxMi4yNDA1QzgzLjg1NzggMTIuMTA4IDgxLjY3NzUgMTEuNTY4MyA3OC4xNTUyIDExLjU2ODNaTTk4LjEzMSAxMi4wMTUxSDk5LjE2MjlMOTguOTY4MiAxMi4zNjU2Qzk3LjQ2OSAxNC43OTk0IDk2Ljk4MjIgMTYuODYzMiA5Ni45ODIyIDE2Ljg4MjdMOTYuOTQzMyAxNy4wNTc5SDk1Ljc5NDVDOTQuMzkyNyAxNy4wNTc5IDkyLjUwNDEgMTguMDMxNSA5MS44MjI2IDE4Ljg0OTJMOTAuNTE4MSAyOC4wOTc2SDg1LjEyNDhMODcuNDgwNyAxMi4wMTUxSDkxLjc0NDdWMTUuMTEwOUM5NC4yMzY5IDEyLjk0OTcgOTYuMTY0NSAxMi4wMTUxIDk4LjEzMSAxMi4wMTUxWk0xMTUuNTM3IDE3LjIxNDdDMTE1Ljc5IDE1LjUyMDcgMTE1LjUxNyAxNC4yNTUyIDExNC42OTkgMTMuMzU5NUMxMTMuNjA5IDEyLjE1MjQgMTExLjUwNiAxMS41NjgzIDEwOC4yOTQgMTEuNTY4M0MxMDEuNzkxIDExLjU2ODMgOTkuMzM3MyAxMy42MTI2IDk4LjU1ODUgMTkuNjg3NEM5OC4xNjkxIDIyLjgwMjYgOTguNjE2OSAyNS4wMDI4IDk5Ljk0MDkgMjYuNDA0NkMxMDEuMjI2IDI3Ljc4NyAxMDMuMzY4IDI4LjQ2ODUgMTA2LjQ2MyAyOC40Njg1QzEwOC42NDQgMjguNDY4NSAxMTEuOTc0IDI4LjA3OTEgMTE0LjA3NiAyNy4yNDE4TDExNC4yNzEgMjcuMTY0TDExNC4yMTMgMjYuOTY5M0MxMTQuMjEzIDI2Ljk2ODEgMTE0LjIxMSAyNi45NjIxIDExNC4yMDggMjYuOTUxNUMxMTQuMjA0IDI2LjkzNzUgMTE0LjE5OCAyNi45MTU1IDExNC4xODkgMjYuODg2MkMxMTQuMDkzIDI2LjU1NDcgMTEzLjcyNCAyNS4yODk2IDExMy41OSAyNC4xMjY2TDExMy41NTEgMjMuODczNUwxMTMuMjk4IDIzLjkzMTlDMTEyLjY1NSAyNC4wODc3IDEwOC42ODMgMjQuMjgyNCAxMDcuMDQ4IDI0LjI4MjRDMTA1LjEzOSAyNC4yODI0IDEwNC4xMjcgMjMuOTMxOSAxMDQuMDEgMjIuMDgyMkwxMDguNjQ0IDIxLjc1MTJDMTI0Ljk5IDIxLjQ5ODEgMTE1LjAxMSAyMC42NDE0IDExNS41MzcgMTcuMjE0N1pNMTA0LjMyMiAxOC44Njk2QzEwNC44MDggMTYuMjYwNiAxMDUuNDMyIDE1LjQ0MjkgMTA3Ljk2MyAxNS40NDI5SDEwOC40NjlDMTA5LjMyNiAxNS40NDI5IDEwOS45MSAxNS41MDEzIDExMC4xNDMgMTUuNzU0NEMxMTAuMjk5IDE1LjkyOTYgMTEwLjM1OCAxNi4yMjE3IDExMC4zMTkgMTYuNzI3OUMxMTAuMTQzIDE4LjE0OTIgMTA5LjQwMyAxOC40NDEzIDEwNy44MjYgMTguNTU4MUwxMDQuMzIyIDE4Ljg2OTZaTTEyOS41NzQgMTEuOTM3MkwxMzAuNTQ3IDUuMzU2MjhMMTM1LjkyMSA1LjM3NTc1TDEzMi41NTMgMjguMTE3SDEyOC4yNVYyNS41NjY0QzEyNi4xMDggMjcuNDk0IDEyMy45MDggMjguNDg3IDEyMS42NjkgMjguNDg3QzEyMC4xMTEgMjguNDg3IDExOC45NDMgMjguMDU4NiAxMTguMTI1IDI3LjE2M0MxMTYuODU5IDI1LjgwMDEgMTE2LjQ5IDIzLjM2NjMgMTE2Ljk5NiAxOS43NDQ4QzExNy45ODkgMTIuOTQ5NyAxMjAuNjM3IDExLjU4NjggMTI0LjYwOSAxMS41ODY4QzEyNi4xODYgMTEuNTg2OCAxMjcuOTc3IDExLjcwMzYgMTI5LjU3NCAxMS45MzcyWk0xMjMuNDc5IDI0LjA4NjdDMTI1LjExNSAyNC4wNDc4IDEyNi40MTkgMjMuMjMgMTI4LjA5NCAyMS44MDg3TDEyOS4wMjggMTUuMzI1MUgxMjYuNjczQzEyMy42NzQgMTUuMzI1MSAxMjMuMDMyIDE1LjY5NSAxMjIuNDQ3IDE5Ljg2MTZDMTIyLjE1NSAyMi4wMDM0IDEyMi4wNTggMjMuMzI3NCAxMjIuNTA2IDIzLjgxNDFDMTIyLjcwMSAyNC4wMjgzIDEyMy4wMTIgMjQuMTA2MiAxMjMuNDc5IDI0LjA4NjdaTTE0My45MDUgOS43NTY2N0wxNDQuNTQ4IDUuMzM2OTFIMTM5LjE5M0wxMzguNTUxIDkuNzU2NjdIMTQzLjkwNVpNMTQxLjE5OSAyOC4wOTc2SDEzNS44NDVMMTM4LjIgMTIuMDE1MUgxNDMuNTc0TDE0MS4xOTkgMjguMDk3NloiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPgo8L3N2Zz4=',
            name: 'Sicredi',
            color: '#1B7139'
        },
        'ifood': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTEuNDQ3IDguNTUzSDQuODk0TDEwIDEwLjMzNEw4LjY3OSAxNi44ODdMMTIgMTNMMTUuMzIxIDE2Ljg4N0wxNCA0LjMzNEwxOS4xMDYgOC41NTNIMTIuNTUzTDEyIDJaIiBmaWxsPSIjRkY0RDEwIi8+CjxwYXRoIGQ9Ik0xMiAyMkM2LjQ3NyAyMiAyIDEzLjUwNyAyIDEwQzIgNi40OTMgNS41NzggMiAxMiAyQzE4LjQyMiAyIDIyIDYuNDkzIDIyIDEwQzIyIDEzLjUwNyAxNy41MjMgMjIgMTIgMjJaIiBzdHJva2U9IiNGRjREMTAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=',
            name: 'iFood',
            color: '#FF4D10'
        },
        'contaazul': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMwMDc1QjEiLz4KPHRleHQgeD0iMTIiIHk9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q0E8L3RleHQ+Cjwvc3ZnPg==',
            name: 'ContaAzul',
            color: '#0075B1'
        },
        'rdstation': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNGRjdBMDAiLz4KPHRleHQgeD0iMTIiIHk9IjE3IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SRDwvdGV4dD4KPC9zdmc+',
            name: 'RD Station',
            color: '#FF7A00'
        },
        'quintoandar': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMwMDY2Q0MiLz4KPHRleHQgeD0iMTIiIHk9IjE3IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RQTwvdGV4dD4KPC9zdmc+',
            name: 'QuintoAndar',
            color: '#0066CC'
        },
        'bancobv': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDU1QTM7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzM0OThEQjtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+Cjx0ZXh0IHg9IjE2IiB5PSIyMiIgZm9udC1mYW1pbHk9Ik1vbnRzZXJyYXQsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CVjwvdGV4dD4KPC9zdmc+',
            name: 'Banco BV',
            color: '#0055A3'
        },
        'general': {
            dataUri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWE0Yjg0O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyZDdkZDI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPHRleHQgeD0iMTYiIHk9IjIyIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QPC90ZXh0Pgo8L3N2Zz4=',
            name: 'Pedro Marconato',
            color: '#1a4b84'
        }
    };
    
    // Detect company from URL or page
    function detectCompany() {
        const url = window.location.href.toLowerCase();
        const pathname = window.location.pathname.toLowerCase();
        
        // Check URL patterns
        if (url.includes('allos') || pathname.includes('allos')) return 'allos';
        if (url.includes('boticario') || pathname.includes('boticario')) return 'boticario';
        if (url.includes('sicredi') || pathname.includes('sicredi')) return 'sicredi';
        if (url.includes('ifood') || pathname.includes('ifood')) return 'ifood';
        if (url.includes('contaazul') || pathname.includes('contaazul')) return 'contaazul';
        if (url.includes('rdstation') || pathname.includes('rdstation')) return 'rdstation';
        if (url.includes('quintoandar') || pathname.includes('quintoandar')) return 'quintoandar';
        if (url.includes('banco-bv') || pathname.includes('banco-bv') || 
            url.includes('bancobv') || pathname.includes('bancobv')) return 'bancobv';
        if (url.includes('completebari') || pathname.includes('completebari')) return 'general'; // Fallback

        // Check page title or meta tags
        const title = document.title.toLowerCase();
        if (title.includes('allos')) return 'allos';
        if (title.includes('boticario') || title.includes('boticário')) return 'boticario';
        if (title.includes('sicredi')) return 'sicredi';
        if (title.includes('ifood')) return 'ifood';
        if (title.includes('conta azul') || title.includes('contaazul')) return 'contaazul';
        if (title.includes('rd station') || title.includes('rdstation')) return 'rdstation';
        if (title.includes('quintoandar') || title.includes('quinto andar')) return 'quintoandar';
        if (title.includes('banco bv') || title.includes('banco-bv') || title.includes('bancobv')) return 'bancobv';

        return 'general'; // Default
    }
    
    // Set favicon with cache check
    function setFavicon(company = null) {
        const detectedCompany = company || detectCompany();

        // Skip if favicon is already set for this company (cache hit)
        if (detectedCompany === cachedCompany) {
            return FAVICONS[detectedCompany] || FAVICONS.general;
        }

        // Update cache
        cachedCompany = detectedCompany;
        const favicon = FAVICONS[detectedCompany] || FAVICONS.general;

        // Remove existing favicons (batch operation)
        const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
        existingFavicons.forEach(link => link.remove());
        
        // Add new favicon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = favicon.dataUri;
        document.head.appendChild(link);
        
        // Add fallback PNG favicons (if available)
        const sizes = ['16x16', '32x32', '180x180'];
        sizes.forEach((size, index) => {
            const pngLink = document.createElement('link');
            if (size === '180x180') {
                pngLink.rel = 'apple-touch-icon';
            } else {
                pngLink.rel = 'icon';
                pngLink.type = 'image/png';
            }
            pngLink.sizes = size;
            pngLink.href = `assets/favicons/${detectedCompany}-${size}.png`;
            document.head.appendChild(pngLink);
        });
        
        // Update page title if needed
        if (document.title === 'Pedro Marconato - CV' || document.title.includes('Company Selection')) {
            document.title = `${favicon.name} - Pedro Marconato CV`;
        }
        
        // Update theme color
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        themeColorMeta.content = favicon.color;
        
        return favicon;
    }
    
    // Dynamic favicon for index page based on form input (debounced)
    function setDynamicFavicon() {
        const companyInput = document.getElementById('companyName');
        if (!companyInput) return;

        // Company mappings for favicon matching
        const companyMappings = {
            'ifood': ['ifood', 'i food', 'if'],
            'rdstation': ['rd', 'rdstation', 'rds', 'rd station'],
            'sicredi': ['sicredi', 'sic', 'sicred'],
            'boticario': ['boticario', 'gb', 'grupoboticario', 'grupo boticario', 'grupo boticário', 'grupoboticário'],
            'completebari': ['completebari', 'complete bari', 'bari', 'cb', 'complete'],
            'allos': ['allos', 'allo', 'all', 'consultoria', 'consulting'],
            'contaazul': ['contazul', 'contaazul', 'ca', 'azulconta', 'azul'],
            'quintoandar': ['quintoandar', 'quinto andar', 'quinto', 'quin', 'qa', 'qto andar', 'qto'],
            'bancobv': ['banco bv', 'banco-bv', 'bv', 'bv banco', 'banco', 'bancobv']
        };

        // Debounced handler - only updates favicon after 300ms of no typing
        const updateFavicon = debounce(function(companyName) {
            // Find matching company
            let matchedCompany = 'general';
            for (const [company, keywords] of Object.entries(companyMappings)) {
                if (keywords.includes(companyName)) {
                    matchedCompany = company;
                    break;
                }
            }
            setFavicon(matchedCompany);
        }, 300);

        // Lightweight input handler - just calls debounced function
        companyInput.addEventListener('input', function() {
            const companyName = this.value.trim().toLowerCase();
            updateFavicon(companyName);
        });
    }
    
    // Initialize favicon system
    function init() {
        // Set initial favicon
        setFavicon();
        
        // Set up dynamic favicon for form pages
        setDynamicFavicon();
        
        // MutationObserver disabled for performance
        // The favicon is already cached and won't change unexpectedly
        // If needed for SPAs, uncomment and add proper cleanup
    }
    
    // Public API
    return {
        init: init,
        setFavicon: setFavicon,
        detectCompany: detectCompany,
        getFaviconData: (company) => FAVICONS[company] || FAVICONS.general
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', DynamicFavicon.init);
} else {
    DynamicFavicon.init();
}

// Export for manual usage
window.DynamicFavicon = DynamicFavicon;