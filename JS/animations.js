class Animations {
    transformFromTop(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            { y: '-100%' },
            {
                y: 0, duration: 1, scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            })
    }

    transformFromBottom(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            { y: '100%' },
            {
                y: 0, duration: 1, scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            })
    }

    transformToLeft(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            { x: '120%' },
            {
                x: 0, duration: 1, scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            })
    }

    transformToRight(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            { x: '-120%' },
            {
                x: 0, duration: 1, scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            })
    }

    transformToLeftWithRotation(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            {
                x: '120%',
                scaleY: -1
            },
            {
                x: 0,
                scaleY: 1,
                duration: 1,
                transformOrigin: "center",
                scrollTrigger: {
                    trigger: ref,
                    start: "top: 80%",
                    once: true
                }
            }
        )
    }

    transformToRightWithRotation(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            {
                x: '-120%',
                scaleY: -1
            },
            {
                x: 0,
                scaleY: 1,
                duration: 1,
                transformOrigin: "center",
                scrollTrigger: {
                    trigger: ref,
                    start: "top: 80%",
                    once: true
                }
            }
        )
    }

    transformScaleY(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            {
                height: 0,
                overflow: "hidden"
            },
            {
                height: "auto",
                duration: 1,
                ease: "power2.out",
                transformOrigin: "top",
                scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            }
        )
    }

    transformScaleX(ref, elementClassname) {
        const element = document.querySelector(elementClassname)

        const originalWidth = element.offsetWidth

        gsap.set(element, { width: 0, overflow: "hidden" })

        gsap.to(element, {
            width: originalWidth,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "top",
            scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                once: true
            }
        })
    }

    transformScaleYLazy(ref, elementClassname) {
        gsap.fromTo(elementClassname,
            {
                height: 0,
                overflow: "hidden"
            },
            {
                height: "auto",
                duration: 1,
                ease: "power2.out",
                transformOrigin: "bottom",
                scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            }
        )
    }

    opacity(ref, elementClassname) {
        gsap.fromTo(`${elementClassname}`,
            { opacity: 0 },
            {
                opacity: 1, duration: 1, scrollTrigger: {
                    trigger: ref,
                    start: "top 80%",
                    once: true
                }
            })
    }
}

export default Animations