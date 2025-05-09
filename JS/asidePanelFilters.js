document.addEventListener('DOMContentLoaded', function () {
    const desktopFilters = document.querySelectorAll('.catalog__aside__panel.desktop .filter__name__title')
    const mobileFilters = document.querySelectorAll('.catalog__aside__panel__mob .filter__name__title')
    const mobileMenu = document.querySelector('.catalog__aside__panel__mob .aside__panel__navbar__mob')
    const mobileMenuButton = document.querySelector('.catalog__aside__panel__mob .aside__panel__title')
    const svgMobButton = document.querySelector('.menu__icon__container')

    function handleDesktopFilterClick(filter) {
        if (filter.closest('.aside__panel__options')) return

        const isHasOptions = filter.classList.contains('has-options')

        desktopFilters.forEach(f => f.classList.remove('active'))
        filter.classList.add('active')

        if (isHasOptions) {
            const options = filter.parentElement.querySelector('.aside__panel__options')
            if (options.style.maxHeight) {
                options.style.maxHeight = null
                options.style.paddingTop = '0px'
            } else {
                options.style.paddingTop = '24px'
                options.style.maxHeight = options.scrollHeight + 'px'
            }
        }
    }

    function handleDesktopSubFilterClick(event) {
        event.stopPropagation()

        const subFilter = event.currentTarget
        const parentFilter = subFilter.closest('.has-options')

        parentFilter.querySelectorAll('.aside__panel__options .filter__name__title').forEach(f => f.classList.remove('active'))
        subFilter.classList.add('active')

        const options = parentFilter.querySelector('.aside__panel__options')
        options.style.maxHeight = options.scrollHeight + 'px'
    }

    function handleMobileFilterClick(event) {
        const filter = event.currentTarget

        if (filter.closest('.aside__panel__options')) return

        const isHasOptions = filter.classList.contains('has-options')

        mobileFilters.forEach(f => f.classList.remove('active'))
        filter.classList.add('active')

        if (isHasOptions) {
            const options = filter.parentElement.querySelector('.aside__panel__options')
            if (options.style.maxHeight) {
                options.style.maxHeight = null
                options.style.paddingTop = '0px'
            } else {
                const currentMaxHeight = parseInt(mobileMenu.style.maxHeight, 10) || 0
                mobileMenu.style.maxHeight = currentMaxHeight + options.scrollHeight + 28 + 'px'

                options.style.paddingTop = '28px'
                options.style.maxHeight = options.scrollHeight + 'px'
            }
        }
    }

    function handleMobileSubFilterClick(event) {
        event.stopPropagation()

        const subFilter = event.currentTarget

        const parentFilterItem = subFilter.closest('.filter__name')
        if (!parentFilterItem) {
            console.error('Родительский элемент .filter__name не найден')
            return
        }

        const parentFilter = parentFilterItem.querySelector('.has-options')
        if (!parentFilter) {
            console.error('Элемент с классом .has-options не найден')
            return
        }

        const subFilters = parentFilterItem.querySelectorAll('.aside__panel__options .filter__name__title')
        subFilters.forEach(f => f.classList.remove('active'))

        subFilter.classList.add('active')

        const options = parentFilterItem.querySelector('.aside__panel__options')
        if (options) {
            options.style.maxHeight = options.scrollHeight + 'px'
        } else {
            console.error('Элемент .aside__panel__options не найден')
        }
    }

    function handleMobileMenuClick() {
        if (mobileMenu.style.maxHeight) {
            mobileMenu.style.maxHeight = null
            console.log(svgMobButton)
            svgMobButton.classList.remove('active')
        } else {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px'
            svgMobButton.classList.add('active')
        }
    }

    desktopFilters.forEach(filter => {
        filter.addEventListener('click', () => handleDesktopFilterClick(filter))
    })

    mobileFilters.forEach(filter => {
        filter.addEventListener('click', handleMobileFilterClick)
    })

    document.querySelectorAll('.catalog__aside__panel.desktop .aside__panel__options .filter__name__title').forEach(subFilter => {
        subFilter.addEventListener('click', handleDesktopSubFilterClick)
    })

    document.querySelectorAll('.catalog__aside__panel__mob .aside__panel__options .filter__name__title').forEach(subFilter => {
        subFilter.addEventListener('click', handleMobileSubFilterClick)
    })

    mobileMenuButton.addEventListener('click', handleMobileMenuClick)
})