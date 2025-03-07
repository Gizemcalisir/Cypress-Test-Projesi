

describe('Login Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Başarılı giriş yapılabiliyor', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('Test@1234');
      cy.get('input[name="terms"]').check();
      cy.get('button').should('not.be.disabled').click();
      
      cy.url().should('include', '/success');
    });

    it('Geçersiz email girildiğinde hata mesajı görünmeli ve buton disabled olmalı', () => {
        cy.get('input[name="email"]').type('yanlisemail');
        cy.get('input[name="password"]').type('Test@1234');
        cy.get('input[name="terms"]').check();
        
        cy.get('p').should('have.length', 1); // 1 hata mesajı olmalı
        cy.contains('Geçerli bir email giriniz.'); // Doğru hata mesajı var mı?
        
        cy.get('button').should('be.disabled'); // Buton disabled olmalı
      });
      
      it('Geçersiz email ve şifre girildiğinde 2 hata mesajı görünmeli ve buton disabled olmalı', () => {
        cy.get('input[name="email"]').type('yanlisemail');
        cy.get('input[name="password"]').type('kisa');
        cy.get('input[name="terms"]').check();
        
        cy.get('p').should('have.length', 2); // 2 hata mesajı olmalı
        cy.contains('Geçerli bir email giriniz.');
        cy.contains('Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.');
        
        cy.get('button').should('be.disabled'); // Buton disabled olmalı
      });
      
      it('Kurallar kabul edilmediğinde buton disabled olmalı', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('Test@1234');
        
        cy.get('button').should('be.disabled'); // Buton disabled olmalı çünkü checkbox seçili değil
      });
      
  });
  