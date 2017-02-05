class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.actualstate='normal';
        this.prevevent='null';
        this.prevstate='null'
        this.initial=0;
        if (config == null) {
            throw (new Error)
        }

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.actualstate;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if ( state == 'hungry' || state == 'busy' || state == 'sleeping' || state =='normal'){
            this.prevstate=this.actualstate;
            this.actualstate=state;
            this.initial=1;
            return this.state;
        }

        else {
             throw (new Error)
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event=='study'&&this.actualstate=='normal'|| 
            event=='get_tired'&&this.actualstate=='busy' ||
            event=='get_hungry'&&this.actualstate=='busy'||
            event=='get_up'&&this.actualstate=='sleeping'||
            event=='eat'&&this.actualstate=='hungry'||
            event=='get_hungry'&&this.actualstate=='sleeping') {
          if (this.actualstate=='normal'&&event=='study'){
            this.prevstate=this.actualstate;
            this.actualstate='busy';
            this.initial=1;
          }
          if (this.actualstate=='busy'&&event=='get_tired'){
            this.prevstate=this.actualstate;
            this.actualstate='sleeping';
            this.initial=1;
          } 
          if (this.actualstate=='busy'&&event=='get_hungry'){
            this.prevstate=this.actualstate;
            this.actualstate='hungry';
            this.initial=1;
          }
          if (this.actualstate=='sleeping'&&event=='get_up'){
            this.prevstate=this.actualstate;
            this.actualstate='normal';
            this.initial=1;
          }
          if (this.actualstate=='sleeping'&&event=='get_hungry'){
            this.prevstate=this.actualstate;
            this.actualstate='hungry';
            this.initial=1;
          }
          if (this.actualstate=='hungry'&&event=='eat'){
            this.prevstate=this.actualstate;
            this.actualstate='normal';
            this.initial=1;
          }
          this.prevevent=event;
        }
        else {
          throw (new Error)  
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.actualstate='normal'
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.initial==0){
            return false;
        }
        else {
            this.actualstate=this.prevstate;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
