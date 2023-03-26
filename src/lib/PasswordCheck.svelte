<script context="module">
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = `!@#$%^&*.,-_'/()[]{}?<>:;=+`;

  export function passwordCheck(password) {
    if (password.length === 0) {
      return [0, '<br>'];
    }

    if (password.length <= 7) {
      return [25, 'Weak'];
    }

    if (password.length <= 10) {
      if (amountOfCharacterTypes(password) <= 2) {
        return [25, 'Weak'];
      } else if (amountOfCharacterTypes(password) === 3) {
        return [50, 'Medium'];
      } else {
        return [75, 'Strong'];
      }
    }

    if (password.length <= 13) {
      if (amountOfCharacterTypes(password) === 1) {
        return [25, 'Weak'];
      } else if (amountOfCharacterTypes(password) === 2) {
        return [50, 'Medium'];
      } else if (amountOfCharacterTypes(password) === 3) {
        return [75, 'Strong'];
      } else {
        return [100, 'Very Strong'];
      }
    }

    if (password.length >= 14) {
      if (amountOfCharacterTypes(password) === 1) {
        return [25, 'Weak'];
      } else if (amountOfCharacterTypes(password) === 2) {
        return [50, 'Medium'];
      } else {
        return [100, 'Very Strong'];
      }
    }
  }

  function amountOfCharacterTypes(password) {
    let amountOfCharacterTypes = 0;

    for (let char of password) {
        if (lowercaseLetters.includes(char)) {
        amountOfCharacterTypes++;
        break;
        }
    }
    for (let char of password) {
        if (uppercaseLetters.includes(char)) {
        amountOfCharacterTypes++;
        break;
        }
    }
    for (let char of password) {
        if (numbers.includes(char)) {
        amountOfCharacterTypes++;
        break;
        }
    }
    for (let char of password) {
        if (symbols.includes(char)) {
        amountOfCharacterTypes++;
        break;
        }
    }
    return amountOfCharacterTypes;
  }

  export function generatePassword() {
    let generatedPassword = '';
    do {
      generatedPassword = '';
      for (let i = 0; i < 14; i++) {
        switch (Math.ceil(Math.random() * 4)) {
          case 1:
            generatedPassword +=
              lowercaseLetters[
                Math.floor(Math.random() * lowercaseLetters.length)
              ];
            break;
          case 2:
            generatedPassword +=
              uppercaseLetters[
                Math.floor(Math.random() * uppercaseLetters.length)
              ];
            break;
          case 3:
            generatedPassword +=
              numbers[Math.floor(Math.random() * numbers.length)];
            break;
          case 4:
            generatedPassword +=
              symbols[Math.floor(Math.random() * symbols.length)];
            break;
        }
      }
    } while (amountOfCharacterTypes(generatedPassword) !== 4);

    return generatedPassword;
  }
</script>
