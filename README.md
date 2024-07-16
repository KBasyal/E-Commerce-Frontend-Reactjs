# hook
 - are the functions defined for some special use cases
 - hook functions always starts with " use keyword in their name
 - basic hooks that are used in react in many way are :-
    - state hook 
      - to maintain a state in any react functional component 
      - useState()
      - useState hook return two data, a.state data b. stateFunction to manipulate state data in an array 
    - effect hook 
      - to listen or execute/render the component whenevet thte is any change on any states/ dependency defined in the component
      - useEffect() id the effect hool 
      - there are 3 major implementation in useEffect hook
      - useEffect (()=>{},[]) ==> this hook executes on any state change of the component
      - cahnage  of the component
      useEffect (()=>{},[]) ==> this hook executes only when 