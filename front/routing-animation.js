class RoutingAnimation {
	/**
	 * Prepare to animate and invoke the first task.
	 */
	start() {
		this.animateNext();

		this._scrollListener = ()=>this.animateAll();
		window.document.addEventListener('scroll', this._scrollListener);
	}

	/**
	 * Clean up.
	 */
	stop() {
		window.document.removeEventListener('scroll', this._scrollListener);
	}

	/**
	 * Reset the element and invoke animation again.
	 * @param {Element} el The target element.
	 */
	resetElement(el) {
		if (el && el.classList && typeof el.classList.remove === 'function') {
			el.classList.remove('is-preparedRoutingAnimation');
		}
		this.animateNext();
	}

	/**
	 * Invoke animation for one target, and get ready for the next.
	 */
	animateNext() {
		const el = this._selectAnimationTargets()[0];
		if (el) {
			this.stopAnimating();
			this.tmDispatchAnimation = setTimeout(()=>{
				this._startAnimation(el);
				this.animateNext();
			}, 50);
		}
	}

	/**
	 * Invoke animation for all targets at once.
	 */
	animateAll() {
		this.stopAnimating();

		const els = this._selectAnimationTargets();
		Array.from(els).forEach((el)=>{
			this._startAnimation(el);
		});
	}

	/**
	 * Stop invocation of animation.
	 */
	stopAnimating() {
		clearTimeout(this.tmDispatchAnimation);
		this.tmDispatchAnimation = null;
	}

	/**
	 * Select the target elements for animation.
	 * @returns {NodeList} NodeList is not Array.
	 */
	_selectAnimationTargets() {
		return window.document.querySelectorAll('[routing-animation]:not(.is-preparedRoutingAnimation)');
	}

	/**
	 * Start one animation.
	 * @param {Element} el The target element.
	 */
	_startAnimation(el) {
		el.classList.add('is-preparedRoutingAnimation');
	}
}

/**
 * @type RoutingAnimation
 */
RoutingAnimation.singletonInstance = null;

/**
 * Return the existing instance.
 * If not, create and return it.
 * @returns {RoutingAnimation}
 */
RoutingAnimation.get = function() {
	if (!RoutingAnimation.singletonInstance) {
		RoutingAnimation.singletonInstance = new RoutingAnimation();
	}
	return RoutingAnimation.singletonInstance;
};

module.exports = RoutingAnimation;
