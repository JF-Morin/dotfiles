return {
    'williamboman/mason-lspconfig.nvim',
    config = function()
        require('mason-lspconfig').setup({
            ensure_installed = {
                'bashls',
                'clangd',
                'omnisharp',
                'cssls',
                'dockerls',
                'docker_compose_language_service',
                'eslint',
                'gopls',
                'html',
                'htmx',
                'jsonls',
                'tsserver',
                'lua_ls',
                'marksman',
                'pyright',
                'rust_analyzer',
                'sqlls',
                'svelte',
                'tailwindcss',
                'lemminx',
                'hydra_lsp',
                'zls'
            }
        })
    end
}
