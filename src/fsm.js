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
        this.initial1=1;
        this.actualstateundo='null';
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
            this.initial++;
             this.initial1=0;
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
            this.initial++;
             this.initial1=0;
          }
          if (this.actualstate=='busy'&&event=='get_tired'){
            this.prevstate=this.actualstate;
            this.actualstate='sleeping';
            this.initial++;
             this.initial1=0;
          } 
          if (this.actualstate=='busy'&&event=='get_hungry'){
            this.prevstate=this.actualstate;
            this.actualstate='hungry';
            this.initial++;
             this.initial1=0;
          }
          if (this.actualstate=='sleeping'&&event=='get_up'){
            this.prevstate=this.actualstate;
            this.actualstate='normal';
            this.initial++;
             this.initial1=0;
          }
          if (this.actualstate=='sleeping'&&event=='get_hungry'){
            this.prevstate=this.actualstate;
            this.actualstate='hungry';
            this.initial++;
             this.initial1=0;
          }
          if (this.actualstate=='hungry'&&event=='eat'){
            this.prevstate=this.actualstate;
            this.actualstate='normal';
            this.initial++;
             this.initial1=0;
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
    getStates(event) {
        if (!event){
            return(['normal', 'busy', 'hungry', 'sleeping']);
        }
        if(event == 'get_hungry'){
            return(['busy', 'sleeping']);
        }
        if (event == 'study') {
            return (['normal']);
        }
        if (event == 'get_tired') {
            return (['normal', 'busy']);
        }
        else {
            return([]);
        }
    }

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
            this.actualstateundo=this.actualstate;
            this.actualstate=this.prevstate;
            this.prevstate=this.actualstateundo;
            this.initial1=0;
            this.initial--;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
       if (this.initial1==1) {
           return false;
        }
        else {
            this.actualstate=this.prevstate;
            return true;
       3 }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.initial = 0;
        this.initial1 = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
