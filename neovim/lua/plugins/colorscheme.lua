return {
	{
		"EdenEast/nightfox.nvim",
		name = "nightfox",
		priority = 1000,
		config = function()
			vim.cmd.colorscheme("carbonfox")
		end,
	},
	{
		"ful1e5/onedark.nvim",
		name = "onedark",
		priority = 1000,
		config = function()
			---vim.cmd.colorscheme 'onedark'
		end,
	},
}
